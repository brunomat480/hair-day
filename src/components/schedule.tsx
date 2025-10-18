import { Button } from '@/components/button';
import { DatePicker } from '@/components/date-picker';
import { Input } from '@/components/input';
import { ScheduleButton } from '@/components/schedule-button';
import { Text } from '@/components/text';
import { formatDate } from '@/utils/format-date';
import { UserSquareIcon } from '@phosphor-icons/react';
import { useState, type ChangeEvent, type FormEvent } from 'react';

interface Schedule {
  id: number;
  customer: string;
  date: Date;
  time: string;
}

const schedules = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

export function Schedule() {
  const now = new Date();

  const [date, setDate] = useState(now);
  const [customer, setCustomer] = useState('');
  const [time, setTime] = useState('');
  const [scheduleList, setScheduleList] = useState<Schedule[]>([]);

  function handleDate(dateValue: Date) {
    setDate(dateValue);
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

    const scheduleAlredyExists = scheduleList.some((schedule) =>
      formatDate(schedule.date) === formatDate(date) && schedule.time === time);

    if (scheduleAlredyExists) {
      return;
    }

    setScheduleList((prevState) => [...prevState, newSchedule]);
    setCustomer('');
    setTime('');
  }

  const isDisabled = !!(date && customer && time);

  const datesWithScheduling = scheduleList.filter((schedule) => formatDate(schedule.date) === formatDate(date));

  const isPastDate = new Date(date).setHours(0, 0, 0, 0) < now.setHours(0, 0, 0, 0);

  return (
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
                      const [hour, minutes] = scheduleItem.split(':').map(Number);

                      const now = new Date();
                      const compareTime = new Date().setHours(hour, minutes, 0);

                      const timeAlreadyScheduled = datesWithScheduling.some(
                        (schedule) => schedule.time === scheduleItem,
                      );

                      if (hour >= 5 && hour <= 12) {
                        return (
                          <ScheduleButton
                            key={scheduleItem}
                            type="button"
                            disabled={timeAlreadyScheduled || isPastDate || (compareTime < now.getTime() && formatDate(now) === formatDate(date))}
                            time={time}
                            scheduleItem={scheduleItem}
                            timeAlreadyScheduled={timeAlreadyScheduled}
                            onClick={() => handleTimeSelect(scheduleItem)}
                          />
                        );
                      }
                    })}
                  </div>
                </div>

                <div>
                  <Text as="small" variant="sm" className="text-gray-200">Tarde</Text>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {schedules.map((scheduleItem) => {
                      const [hour, minutes] = scheduleItem.split(':').map(Number);

                      const now = new Date();
                      const compareTime = new Date().setHours(hour, minutes, 0);

                      const timeAlreadyScheduled = datesWithScheduling.some(
                        (schedule) => schedule.time === scheduleItem,
                      );

                      if (hour > 12 && hour <= 18) {
                        return (
                          <ScheduleButton
                            key={scheduleItem}
                            type="button"
                            disabled={timeAlreadyScheduled || isPastDate || (compareTime < now.getTime() && formatDate(now) === formatDate(date))}
                            time={time}
                            scheduleItem={scheduleItem}
                            timeAlreadyScheduled={timeAlreadyScheduled}
                            onClick={() => handleTimeSelect(scheduleItem)}
                          />
                        );
                      }
                    })}
                  </div>
                </div>

                <div>
                  <Text as="small" variant="sm" className="text-gray-200">Noite</Text>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {schedules.map((scheduleItem) => {
                      const [hour, minutes] = scheduleItem.split(':').map(Number);

                      const now = new Date();
                      const compareTime = new Date().setHours(hour, minutes, 0);

                      const timeAlreadyScheduled = datesWithScheduling.some(
                        (schedule) => schedule.time === scheduleItem,
                      );

                      if (hour > 18 && hour <= 23) {
                        return (
                          <ScheduleButton
                            key={scheduleItem}
                            type="button"
                            disabled={timeAlreadyScheduled || isPastDate || (compareTime < now.getTime() && formatDate(now) === formatDate(date))}
                            time={time}
                            scheduleItem={scheduleItem}
                            timeAlreadyScheduled={timeAlreadyScheduled}
                            onClick={() => handleTimeSelect(scheduleItem)}
                          />
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
  );
}
