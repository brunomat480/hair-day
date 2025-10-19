import { Button } from '@/components/button';
import { DatePicker } from '@/components/date-picker';
import { Input } from '@/components/input';
import { ScheduleButtonList } from '@/components/schedule-button-list';
import { Text } from '@/components/text';
import { formatDate } from '@/utils/format-date';
import { UserSquareIcon } from '@phosphor-icons/react';
import { useState, type ChangeEvent, type FormEvent } from 'react';

export interface Schedule {
  id: number;
  customer: string;
  date: Date;
  time: string;
}

export function Schedule() {
  const [date, setDate] = useState(new Date);
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

  return (
    <div className="bg-gray-700 px-20 p-20 rounded-xl min-w-lg">
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
                <ScheduleButtonList
                  timeOfDay="morning"
                  date={date}
                  datesWithScheduling={datesWithScheduling}
                  onTimeSelect={handleTimeSelect}
                  time={time}
                />

                <ScheduleButtonList
                  timeOfDay="afternoon"
                  date={date}
                  datesWithScheduling={datesWithScheduling}
                  onTimeSelect={handleTimeSelect}
                  time={time}
                />

                <ScheduleButtonList
                  timeOfDay="night"
                  date={date}
                  datesWithScheduling={datesWithScheduling}
                  onTimeSelect={handleTimeSelect}
                  time={time}
                />
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
