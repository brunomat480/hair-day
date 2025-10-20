import { ScheduleButton } from '@/components/schedule-button';
import { Text } from '@/components/text';
import { useSchedule } from '@/hooks/use-schedule';
import { formatDate } from '@/utils/format-date';
import { getPeriod } from '@/utils/get-periods';

export type PeriodType = 'morning' | 'afternoon' | 'night'

interface ScheduleButtonListProps {
  period: PeriodType
  time: string;
  date: Date;
  onTimeSelect: (scheduleItem: string) => void
}

const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

export function ScheduleButtonList({
  period,
  time,
  date,
  onTimeSelect,
}: ScheduleButtonListProps) {
  const { schedules } = useSchedule();

  const weekDay = new Date(date).getDay();
  const isSunday = weekDay === 0;
  const isSaturday = weekDay === 6;

  const isPastDate = new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);

  const datesWithScheduling = schedules.filter((schedule) => formatDate(schedule.date) === formatDate(date));

  return (
    <div>
      <Text as="small" variant="sm" className="text-gray-200">
        {period === 'morning' && 'Manhã'}
        {period === 'afternoon' && 'Tarde'}
        {period === 'night' && 'Noite'}
      </Text>
      <div className="mt-2 flex gap-2 flex-wrap">
        {hours.map((scheduleItem) => {
          const [hour, minutes] = scheduleItem.split(':').map(Number);

          const now = new Date();
          const compareTime = now.setHours(hour, minutes, 0);

          const timeAlreadyScheduled = datesWithScheduling.some(
            (schedule) => schedule.time === scheduleItem,
          );

          const isDisabled = timeAlreadyScheduled || isPastDate || (compareTime < now.getTime() && formatDate(now) === formatDate(date)) || isSunday || (isSaturday && hour > 12 && hour <= 21);

          if (getPeriod(period, hour)) {
            return (
              <ScheduleButton
                key={scheduleItem}
                type="button"
                disabled={isDisabled}
                time={time}
                scheduleItem={scheduleItem}
                timeAlreadyScheduled={timeAlreadyScheduled}
                onClick={() => onTimeSelect(scheduleItem)}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
