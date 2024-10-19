import { FC } from 'react';
import {
  Datepicker,
  DatepickerEvent,
} from '@meinefinsternis/react-horizontal-date-picker';
import { enUS } from 'date-fns/locale';
import { useState } from 'react';

interface HorizontalDatePickerProps {
  setSelectedDate: (date: Date) => void;
}

const HorizontalDatePicker: FC<HorizontalDatePickerProps> = ({
  setSelectedDate,
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

    setSelectedDate(startValue as Date);

    setDate((prev) => ({
      ...prev,
      endValue: startValue,
      startValue,
    }));
  };

  return (
    <Datepicker
      onChange={handleChange}
      locale={enUS}
      startValue={date.startValue}
      endValue={date.endValue}
    />
  );
};

export default HorizontalDatePicker;
