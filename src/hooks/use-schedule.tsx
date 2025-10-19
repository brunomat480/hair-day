import { ScheduleContext } from '@/contexts/schedule-context';
import { useContext } from 'react';

export function useSchedule() {
  const scheduleContext = useContext(ScheduleContext);

  if (!scheduleContext) {
    throw new Error('must be used within a provider');
  }

  return scheduleContext;
}
