import { Button } from '@/components/button';
import { DatePicker } from '@/components/date-picker';
import { Input } from '@/components/input';
import { ScheduleButtonList } from '@/components/schedule-button-list';
import { Text } from '@/components/text';
import { useSchedule } from '@/hooks/use-schedule';
import { UserSquareIcon } from '@phosphor-icons/react';
import { useState, type ChangeEvent, type FormEvent } from 'react';

interface ScheduleProps {
  onDate: (date: Date) => void;
}

export function Schedule({ onDate }: ScheduleProps) {
  const { createSchedule } = useSchedule();

  const [date, setDate] = useState(new Date());
  const [customer, setCustomer] = useState('');
  const [time, setTime] = useState('');

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

    createSchedule({
      customer, date, time,
    });

    onDate(date);
    setCustomer('');
    setTime('');
  }

  const isDisabled = !!(date && customer && time);

  return (
    <div className="bg-gray-700 px-8 py-20 md:p-20 rounded-xl md:min-w-lg">
      <div className="space-y-2">
        <Text as="h1" variant="lg" className="font-bold leading-10">
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
                  period="morning"
                  date={date}
                  onTimeSelect={handleTimeSelect}
                  time={time}
                />

                <ScheduleButtonList
                  period="afternoon"
                  date={date}
                  onTimeSelect={handleTimeSelect}
                  time={time}
                />

                <ScheduleButtonList
                  period="night"
                  date={date}
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
