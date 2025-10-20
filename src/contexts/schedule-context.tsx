import type { PeriodType } from '@/components/schedule-button-list';
import type { Schedule } from '@/types/schedule';
import { formatDate } from '@/utils/format-date';
import { getPeriod } from '@/utils/get-periods';
import { createContext, useState, type ReactNode } from 'react';

interface ScheduleContextType {
  schedules: Schedule[];
  createSchedule: (schedule: Schedule) => void;
  filterByPeriod: (currentDateSchedules: Schedule[], period: PeriodType) => Schedule[];
  deleteSchedule: (id: number) => void;
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

  function deleteSchedule(id: number) {
    setSchedule((prevState) => prevState.filter((schedule) => schedule.id !== id));
  }

  function filterByPeriod(currentDateSchedules: Schedule[], period: PeriodType) {
    return currentDateSchedules.filter((schedule) => {
      const [hour] = schedule.time.split(':').map(Number);
      return getPeriod(period, hour);
    });
  };

  return (
    <ScheduleContext.Provider value={{
      schedules,
      createSchedule,
      filterByPeriod,
      deleteSchedule,
    }}>
      {children}
    </ScheduleContext.Provider>
  );
}
