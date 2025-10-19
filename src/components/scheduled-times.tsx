import { ScheduleList } from '@/components/shedule-list';
import { Text } from '@/components/text';
import { useSchedule } from '@/hooks/use-schedule';
import { getPeriod } from '@/utils/get-periods';

export function ScheduledTimes() {
  const { schedules } = useSchedule();

  const schedulesMorning = schedules.filter((schedule) => {
    const [hour] = schedule?.time.split(':').map(Number);

    return getPeriod('morning', hour);
  });

  const schedulesAfternoon = schedules.filter((schedule) => {
    const [hour] = schedule?.time.split(':').map(Number);

    return getPeriod('afternoon', hour);
  });

  const schedulesNight = schedules.filter((schedule) => {
    const [hour] = schedule?.time.split(':').map(Number);

    return getPeriod('night', hour);
  });

  return (
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
          {/* <DatePicker onDate={handleDate} left /> */}
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <ScheduleList period="morning" schedules={schedulesMorning} />
        <ScheduleList period="afternoon" schedules={schedulesAfternoon} />
        <ScheduleList period="night" schedules={schedulesNight} />
      </div>
    </div>
  );
}
