import logoImg from '@/assets/images/logo.svg';
import { Schedule } from '@/components/schedule';

export function App() {

  return (
    <div className="bg-gray-900 min-h-screen relative">
      <header className="fixed top-0 left-0 bg-gray-600 px-5 py-3 rounded-br-2xl z-20">
        <img src={logoImg} alt="Logo da HairDay" />
      </header>

      <main className="p-3">
        <Schedule />
      </main>
    </div>
  );
}
