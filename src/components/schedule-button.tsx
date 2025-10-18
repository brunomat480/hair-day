import { Text } from '@/components/text';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface ScheduleButtonProps extends ComponentProps<'button'> {
  time: string;
  scheduleItem: string;
  timeAlreadyScheduled: boolean;
}

export function ScheduleButton({
  time,
  scheduleItem,
  timeAlreadyScheduled,
  ...props
}: ScheduleButtonProps) {
  return (
    <button
      className={twMerge(
        'px-5 py-2 rounded-lg select-none border cursor-pointer hover:bg-gray-500 hover:transition hover:duration-150 group disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
        time === scheduleItem && !timeAlreadyScheduled
          ? 'border-yellow'
          : 'border-gray-500',
      )}
      {...props}
    >
      <Text className={time === scheduleItem && !timeAlreadyScheduled ? 'text-yellow' : 'text-gray-200'}>{scheduleItem}</Text>
    </button>
  );
}
