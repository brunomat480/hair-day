import logoImg from '@/assets/images/logo.svg';
import { Button } from '@/components/button';
import { DatePicker } from '@/components/date-picker';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { formatDate } from '@/utils/format-date';
import { UserSquareIcon } from '@phosphor-icons/react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { twMerge } from 'tailwind-merge';

interface Schedule {
  id: number;
  customer: string;
  date: string;
  time: string;
}

const schedules = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

export function App() {
  const [date, setDate] = useState(formatDate(new Date));
  const [customer, setCustomer] = useState('');
  const [time, setTime] = useState('');
  const [scheduleList, setScheduleList] = useState<Schedule[]>([]);

  function handleDate(date: string) {
    setDate(date);
    setTime('');
  }

  function handleCostumer(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setCustomer(value);
  }

  function handleTimeSelect(timeValue: string) {
    setTime(timeValue);
  }

  function handleNewSchedule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newSchedule: Schedule = {
      id: scheduleList.length + 1,
      customer,
      date,
      time,
    };

    setScheduleList((prevState) => [...prevState, newSchedule]);
  }

  const isDisabled = !!(date && customer && time);

  const datesWithScheduling = scheduleList.filter((schedule) => schedule.date === date);
  console.log(datesWithScheduling);

  return (
    <div className="bg-gray-900 min-h-screen relative">
      <header className="fixed top-0 left-0 bg-gray-600 px-5 py-3 rounded-br-2xl z-20">
        <img src={logoImg} alt="Logo da HairDay" />
      </header>

      <main className="p-3">
        <div className="bg-gray-700 px-20 p-20 rounded-xl">
          <div className="space-y-2">
            <Text as="h1" variant="lg" className="font-bold">
            Agende um atendimento
            </Text>
            <Text as="p" variant="md" className="text-gray-300">
            Selecione data, horário e informe o nome do cliente para criar o agendamento
            </Text>
          </div>

          <form className="mt-6 space-y-6" onSubmit={handleNewSchedule}>
            <div className="space-y-8">
              <div className="flex flex-col gap-2">
                <label className="text-md text-gray-200 font-bold w-max" htmlFor="date">Data</label>
                <DatePicker id="date" onDate={handleDate}/>
              </div>

              <div>
                <Text className="text-gray-200 font-bold">Horários</Text>
                <div className="space-y-3 mt-2">
                  <div className="space-y-3">
                    <div>
                      <Text as="small" variant="sm" className="text-gray-200">Manhã</Text>
                      <div className="mt-2 flex gap-2 flex-wrap">
                        {schedules.map((scheduleItem) => {
                          const [hourSplit] = scheduleItem.split(':');
                          const hour = parseInt(hourSplit, 10);

                          const timeAlreadyScheduled = datesWithScheduling.some(
                            (schedule) => schedule.time === scheduleItem,
                          );

                          if (hour >= 5 && hour <= 12) {
                            return (
                              <button
                                key={scheduleItem}
                                type="button"
                                disabled={timeAlreadyScheduled}
                                onClick={() => handleTimeSelect(scheduleItem)}
                                className={twMerge(
                                  'px-5 py-2 rounded-lg select-none border cursor-pointer hover:bg-gray-500 hover:transition hover:duration-150 group disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
                                  time === scheduleItem && !timeAlreadyScheduled
                                    ? 'border-yellow'
                                    : 'border-gray-500',
                                )}
                              >
                                <Text className={time === scheduleItem && !timeAlreadyScheduled ? 'text-yellow' : 'text-gray-200'}>{scheduleItem}</Text>
                              </button>
                            );
                          }
                        })}
                      </div>
                    </div>

                    <div>
                      <Text as="small" variant="sm" className="text-gray-200">Tarde</Text>
                      <div className="mt-2 flex gap-2 flex-wrap">
                        {schedules.map((scheduleItem) => {
                          const [hourSplit] = scheduleItem.split(':');
                          const hour = parseInt(hourSplit, 10);
                          const timeAlreadyScheduled = datesWithScheduling.some(
                            (schedule) => schedule.time === scheduleItem,
                          );

                          if (hour > 12 && hour <= 18) {
                            return (
                              <button
                                key={scheduleItem}
                                type="button"
                                disabled={timeAlreadyScheduled}
                                onClick={() => handleTimeSelect(scheduleItem)}
                                className={twMerge(
                                  'px-5 py-2 rounded-lg select-none border cursor-pointer hover:bg-gray-500 hover:transition hover:duration-150 group disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
                                  time === scheduleItem && !timeAlreadyScheduled
                                    ? 'border-yellow'
                                    : 'border-gray-500',
                                )}
                              >
                                <Text className={time === scheduleItem && !timeAlreadyScheduled ? 'text-yellow' : 'text-gray-200'}>{scheduleItem}</Text>
                              </button>
                            );
                          }
                        })}
                      </div>
                    </div>

                    <div>
                      <Text as="small" variant="sm" className="text-gray-200">Noite</Text>
                      <div className="mt-2 flex gap-2 flex-wrap">
                        {schedules.map((scheduleItem) => {
                          const [hourSplit] = scheduleItem.split(':');
                          const hour = parseInt(hourSplit, 10);
                          const timeAlreadyScheduled = datesWithScheduling.some(
                            (schedule) => schedule.time === scheduleItem,
                          );

                          if (hour > 18 && hour <= 23) {
                            return (
                              <button
                                key={scheduleItem}
                                type="button"
                                disabled={timeAlreadyScheduled}
                                onClick={() => handleTimeSelect(scheduleItem)}
                                className={twMerge(
                                  'px-5 py-2 rounded-lg select-none border cursor-pointer hover:bg-gray-500 hover:transition hover:duration-150 group disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
                                  time === scheduleItem && !timeAlreadyScheduled
                                    ? 'border-yellow'
                                    : 'border-gray-500',
                                )}
                              >
                                <Text className={time === scheduleItem && !timeAlreadyScheduled ? 'text-yellow' : 'text-gray-200'}>{scheduleItem}</Text>
                              </button>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 max-w-sm">
                <label className="text-md text-gray-200 font-bold w-max" htmlFor="customer">Cliente</label>
                <Input id="customer" value={customer} autoComplete="off" icon={UserSquareIcon} onChange={handleCostumer} />
              </div>
            </div>

            <Button type="submit" disabled={!isDisabled}>Agendar</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
