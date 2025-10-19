import type { Schedule } from '@/types/schedule';
import { formatDate } from '@/utils/format-date';
import { createContext, useState, type ReactNode } from 'react';

interface ScheduleContextType {
  schedules: Schedule[];
  createSchedule: (schedule: Schedule) => void;
}

export const ScheduleContext = createContext({} as ScheduleContextType);

interface ScheduleContextProviderPorps {
  children: ReactNode;
}

export function ScheduleContextProvider({ children }: ScheduleContextProviderPorps) {
  const [schedules, setSchedule] = useState<Schedule[]>([]);

  function createSchedule({
    customer,
    date,
    time,
  }: Schedule) {
    const newSchedule: Schedule = {
      id: schedules.length + 1,
      customer,
      date,
      time,
    };

    const scheduleAlredyExists = schedules.some((schedule) =>
      formatDate(schedule.date) === formatDate(date) && schedule.time === time);

    if (scheduleAlredyExists) {
      return;
    }

    setSchedule((prevState) => [...prevState, newSchedule]);

  }

  return (
    <ScheduleContext.Provider value={{
      schedules,
      createSchedule,
    }}>
      {children}
    </ScheduleContext.Provider>
  );
}
