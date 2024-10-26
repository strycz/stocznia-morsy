import { FC, useEffect } from 'react';
import {
  Datepicker,
  DatepickerEvent,
} from '@meinefinsternis/react-horizontal-date-picker';
import { pl } from 'date-fns/locale';
import { subDays } from 'date-fns';
import { useState } from 'react';

interface HorizontalDatePickerProps {
  dateSelectedHandler: (date: Date) => void;
}

const HorizontalDatePicker: FC<HorizontalDatePickerProps> = ({
  dateSelectedHandler,
}) => {
  const [date, setDate] = useState<{
    endValue: Date | null;
    startValue: Date | null;
    rangeDates: Date[] | null;
  }>({
    startValue: null,
    endValue: null,
    rangeDates: [],
  });

  const handleChange = (event: DatepickerEvent) => {
    const [startValue] = event;

    dateSelectedHandler(startValue as Date);

    setDate((prev) => ({
      ...prev,
      endValue: startValue,
      startValue,
    }));
  };

  useEffect(() => {
    // Trigger onChange event with nearest Saturday from today when component is created
    const today = new Date();
    const daysUntilSaturday = (6 - today.getDay() + 7) % 7;
    const nearestSaturday = new Date(
      today.setDate(today.getDate() + daysUntilSaturday)
    );
    handleChange([nearestSaturday, null, null]);
  }, []);

  const disabledDates = () => {
    const startDate = subDays(new Date(), 1);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 3);

    const disabledDates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        disabledDates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return disabledDates;
  };

  return (
    <Datepicker
      onChange={handleChange}
      locale={pl}
      startDate={subDays(new Date(), 1)}
      disabledDates={disabledDates()}
      startValue={date.startValue}
      endValue={date.endValue}
    />
  );
};

export default HorizontalDatePicker;
