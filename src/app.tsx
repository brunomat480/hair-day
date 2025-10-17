import logoImg from '@/assets/images/logo.svg';
import { DatePicker } from '@/components/date-picker';
import { Text } from '@/components/text';

export function App() {
  return (
    <div className="bg-gray-900 p-3 h-screen relative">
      <header className="fixed top-0 left-0 bg-gray-600 px-5 py-3 rounded-br-2xl">
        <img src={logoImg} alt="Logo da HairDay" />
      </header>

      <main>

        <div className="bg-gray-700 px-20 p-20 rounded-xl">
          <div className="space-y-2">
            <Text as="h1" variant="lg" className="font-bold">
            Agende um atendimento
            </Text>
            <Text as="p" variant="md" className="text-gray-300">
            Selecione data, horário e informe o nome do cliente para criar o agendamento
            </Text>
          </div>

          <div className="mt-6">
            <DatePicker />
          </div>
        </div>
      </main>
    </div>
  );
}
