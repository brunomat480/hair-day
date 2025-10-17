import logoImg from '@/assets/images/logo.svg';
import { Text } from '@/components/text';

export function App() {
  return (
    <div className="bg-gray-900 p-3 h-screen relative">
      <header className="fixed top-0 left-0 bg-gray-600 px-5 py-3 rounded-br-2xl">
        <img src={logoImg} alt="Logo da HairDay" />
      </header>

      <main>

        <div className="bg-gray-700 px-20 p-20 rounded-xl">
          <div className="space-y-1">

          </div>
          <Text className="text-gray-100 font-bold" variant="lg">
            Agende um atendimento
          </Text>
          <p className="text-md text-gray-100 leading-6">Selecione data, horário e informe o nome do cliente para criar o agendamento</p>
        </div>

      </main>
    </div>
  );
}
