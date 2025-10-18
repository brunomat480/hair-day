import logoImg from '@/assets/images/logo.svg';
import { Button } from '@/components/button';
import { DatePicker } from '@/components/date-picker';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { UserSquareIcon } from '@phosphor-icons/react';

const schedules = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

export function App() {

  return (
    <div className="bg-gray-900 relative">
      <header className="fixed top-0 left-0 bg-gray-600 px-5 py-3 rounded-br-2xl">
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

          <form className="mt-6 space-y-6">
            <div className="space-y-8">
              <div className="flex flex-col gap-2">
                <label className="text-md text-gray-200 font-bold w-max" htmlFor="date">Data</label>
                <DatePicker id="date"/>
              </div>

              <div>
                <Text className="text-gray-200 font-bold">Horários</Text>
                <div className="space-y-3 mt-2">
                  <div className="space-y-3">
                    <div>
                      <Text as="small" variant="sm" className="text-gray-200">Manhã</Text>
                      <div className="mt-2 flex gap-2 flex-wrap">
                        {schedules.map((schedule) => {
                          const [hourSplit] = schedule.split(':');
                          const hour = parseInt(hourSplit, 10);

                          if (hour >= 5 && hour <= 12) {
                            return (
                              <button key={schedule} className="px-5 py-2 rounded-lg text-gray-600 border border-gray-500 cursor-pointer hover:bg-gray-500 hover:transition hover:duration-150">
                                <Text className="text-gray-200">{schedule}</Text>
                              </button>
                            );
                          }
                        })}
                      </div>
                    </div>

                    <div>
                      <Text as="small" variant="sm" className="text-gray-200">Tarde</Text>
                      <div className="mt-2 flex gap-2 flex-wrap">
                        {schedules.map((schedule) => {
                          const [hourSplit] = schedule.split(':');
                          const hour = parseInt(hourSplit, 10);

                          if (hour > 12 && hour <= 18) {
                            return (
                              <button key={schedule} className="px-5 py-2 rounded-lg text-gray-600 border border-gray-500 cursor-pointer hover:bg-gray-500 hover:transition hover:duration-150">
                                <Text className="text-gray-200">{schedule}</Text>
                              </button>
                            );
                          }
                        })}
                      </div>
                    </div>

                    <div>
                      <Text as="small" variant="sm" className="text-gray-200">Noite</Text>
                      <div className="mt-2 flex gap-2 flex-wrap">
                        {schedules.map((schedule) => {
                          const [hourSplit] = schedule.split(':');
                          const hour = parseInt(hourSplit, 10);

                          if (hour > 18 && hour <= 23) {
                            return (
                              <button key={schedule} className="px-5 py-2 rounded-lg text-gray-600 border border-gray-500 cursor-pointer hover:bg-gray-500 hover:transition hover:duration-150">
                                <Text className="text-gray-200">{schedule}</Text>
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
                <Input icon={UserSquareIcon} id="customer" />
              </div>
            </div>

            <Button>Agendar</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
