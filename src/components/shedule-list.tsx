import type { PeriodType } from '@/components/schedule-button-list';
import { Text } from '@/components/text';
import type { Schedule } from '@/types/schedule';
import { CloudSunIcon, MoonStarsIcon, SunHorizonIcon, TrashIcon } from '@phosphor-icons/react';

interface ScheduleListProps {
  period: PeriodType;
  schedules: Schedule[];
}

const timeOfDayPeriod = {
  morning: {
    title: 'Manhã',
    icon: SunHorizonIcon,
    hours: '09h-12h',
  },
  afternoon: {
    title: 'Tarde',
    icon: CloudSunIcon,
    hours: '13h-18h',
  },
  night: {
    title: 'Noite',
    icon: MoonStarsIcon,
    hours: '19h-21h',
  },
};

export function ScheduleList({ period, schedules }: ScheduleListProps) {

  if (schedules.length <= 0) {
    return null;
  }

  const Icon = timeOfDayPeriod[period].icon;

  return (
    <div>
      <div className="py-3 px-5 flex items-center justify-between border-t border-x border-gray-600 rounded-t-lg">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="size-5 fill-yellow-dark" weight="bold" />}
          <Text className="text-gray-300" variant="sm">{timeOfDayPeriod[period].title}</Text>
        </div>

        <Text className="text-gray-400" variant="sm">{timeOfDayPeriod[period].hours}</Text>
      </div>

      <div  className="border border-gray-600 p-5 rounded-b-lg">
        {schedules.map((schedule) => {
          const [hour, minutes] = schedule.time.split(':').map(Number);

          const now = new Date();

          const scheduleDateTime = new Date(schedule.date);
          scheduleDateTime.setHours(hour, minutes, 0, 0);

          const timeAlreadyServed = scheduleDateTime < now;

          console.log({ timeAlreadyServed });

          return (
            <div key={schedule.id} data-time-served={timeAlreadyServed} className="flex items-center justify-between gap-0.5 py-1 data-[time-served=true]:opacity-30">
              <div className="flex items-center gap-5">
                <Text className="text-gray-200 font-bold">{schedule?.time}</Text>
                <Text className="text-gray-200">{schedule?.customer}</Text>
              </div>

              <button type="button" className="group p-1 rounded cursor-pointer">
                <TrashIcon className="size-4 fill-yellow group-hover:fill-yellow-dark" />
              </button>
            </div>
          );
        },
        )}
      </div>
    </div>
  );
}
