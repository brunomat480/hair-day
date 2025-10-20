import { DatePicker } from '@/components/date-picker';
import { ScheduleList } from '@/components/shedule-list';
import { Text } from '@/components/text';
import { useSchedule } from '@/hooks/use-schedule';
import { formatDate } from '@/utils/format-date';
import { useMemo } from 'react';

interface ScheduledTimesProps {
  date: Date
  onDate: (date: Date) => void
}

export function ScheduledTimes({ onDate, date }: ScheduledTimesProps) {
  const { schedules, filterByPeriod } = useSchedule();

  const filteredSchedules = useMemo(() => {
    const currentDateSchedules = schedules.filter(
      (schedule) => formatDate(date) === formatDate(schedule.date),
    );

    const morning = filterByPeriod(currentDateSchedules, 'morning');
    const afternoon = filterByPeriod(currentDateSchedules, 'afternoon');
    const night = filterByPeriod(currentDateSchedules, 'night');

    return {
      morning,
      afternoon,
      night,
    };
  }, [schedules, date]);

  const {
    morning,
    afternoon,
    night,
  } = filteredSchedules;

  return (
    <div className="py-20 md:px-28 w-full px-8 h-screen md:h-auto">
      <div className="flex flex-wrap lg:flex-nowrap gap-y-4 items-centers justify-between">
        <div className="space-y-2">
          <Text as="h2" variant="lg" className="font-bold">
              Sua agenda
          </Text>
          <Text as="p" variant="md" className="text-gray-300">
              Consulte os seus cortes de cabelo agendados por dia
          </Text>
        </div>

        <div className="max-w-40">
          <DatePicker onDate={onDate} filterDate={date} left />
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <ScheduleList period="morning" schedules={morning} />
        <ScheduleList period="afternoon" schedules={afternoon} />
        <ScheduleList period="night" schedules={night} />
      </div>
    </div>
  );
}
