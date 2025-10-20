import logoImg from '@/assets/images/logo.svg';
import { Schedule } from '@/components/schedule';
import { ScheduledTimes } from '@/components/scheduled-times';

import { ScheduleContextProvider } from '@/contexts/schedule-context';
import { useState } from 'react';

export function App() {
  const [date, setDate] = useState(new Date());

  function handleDate(date: Date) {
    setDate(date);
  }

  return (
    <div className="bg-gray-900 min-h-screen relative">
      <header className="fixed top-0 left-0 bg-gray-600 px-5 py-3 rounded-br-2xl z-20">
        <img src={logoImg} alt="Logo da HairDay" />
      </header>

      <main className="py-3 flex flex-wrap lg:flex-nowrap gap-3 container mx-auto">
        <ScheduleContextProvider>
          <Schedule onDate={handleDate} />
          <ScheduledTimes onDate={handleDate} date={date} />
        </ScheduleContextProvider>
      </main>
    </div>
  );
}
