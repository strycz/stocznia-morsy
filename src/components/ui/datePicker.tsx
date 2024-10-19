import {
  Datepicker,
  DatepickerEvent,
} from '@meinefinsternis/react-horizontal-date-picker';
import { enUS } from 'date-fns/locale';
import { useState } from 'react';

export default function HorizontalDatePicker() {
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
}
