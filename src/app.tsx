import logoImg from '@/assets/images/logo.svg';
import { DatePicker } from '@/components/date-picker';
import { Schedule } from '@/components/schedule';
import { Text } from '@/components/text';
import { CloudSunIcon, MoonStarsIcon, SunHorizonIcon, TrashIcon } from '@phosphor-icons/react';

export function App() {

  return (
    <div className="bg-gray-900 min-h-screen relative">
      <header className="fixed top-0 left-0 bg-gray-600 px-5 py-3 rounded-br-2xl z-20">
        <img src={logoImg} alt="Logo da HairDay" />
      </header>

      <main className="py-3 flex gap-3 container mx-auto">
        <Schedule />

        <div className="py-20 px-28 w-full">
          <div className="flex items-centers justify-between">
            <div className="space-y-2">
              <Text as="h2" variant="lg" className="font-bold">
              Sua agenda
              </Text>
              <Text as="p" variant="md" className="text-gray-300">
              Consulte os seus cortes de cabelo agendados por dia
              </Text>
            </div>

            <div className="max-w-40">
              <DatePicker left />
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <div>
              <div className="py-3 px-5 flex items-center justify-between border-t border-x border-gray-600 rounded-t-lg">
                <div className="flex items-center gap-3">
                  <SunHorizonIcon className="size-5 fill-yellow-dark" weight="bold" />
                  <Text className="text-gray-300" variant="sm">Manhã</Text>
                </div>

                <Text className="text-gray-400" variant="sm">09h-12h</Text>
              </div>

              <div className="border border-gray-600 p-5 rounded-b-lg flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <Text className="text-gray-200 font-bold">11:00</Text>
                  <Text className="text-gray-200">Ryan Dorwart</Text>
                </div>

                <button type="button" className="group p-1 rounded cursor-pointer">
                  <TrashIcon className="size-4 fill-yellow group-hover:fill-yellow-dark" />
                </button>
              </div>
            </div>

            <div>
              <div className="py-3 px-5 flex items-center justify-between border-t border-x border-gray-600 rounded-t-lg">
                <div className="flex items-center gap-3">
                  <CloudSunIcon className="size-5 fill-yellow-dark" weight="bold" />
                  <Text className="text-gray-300" variant="sm">Tarde</Text>
                </div>

                <Text className="text-gray-400" variant="sm">13h-18h</Text>
              </div>

              <div className="border border-gray-600 p-5 rounded-b-lg flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <Text className="text-gray-200 font-bold">11:00</Text>
                  <Text className="text-gray-200">Ryan Dorwart</Text>
                </div>

                <button type="button" className="group p-1 rounded cursor-pointer">
                  <TrashIcon className="size-4 fill-yellow group-hover:fill-yellow-dark" />
                </button>
              </div>
            </div>

            <div>
              <div className="py-3 px-5 flex items-center justify-between border-t border-x border-gray-600 rounded-t-lg">
                <div className="flex items-center gap-3">
                  <MoonStarsIcon className="size-5 fill-yellow-dark" weight="bold" />
                  <Text className="text-gray-300" variant="sm">Noite</Text>
                </div>

                <Text className="text-gray-400" variant="sm">19h-21h</Text>
              </div>

              <div className="border border-gray-600 p-5 rounded-b-lg flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <Text className="text-gray-200 font-bold">11:00</Text>
                  <Text className="text-gray-200">Ryan Dorwart</Text>
                </div>

                <button type="button" className="group p-1 rounded cursor-pointer">
                  <TrashIcon className="size-4 fill-yellow group-hover:fill-yellow-dark" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
