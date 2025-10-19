import type { PeriodType } from '@/components/schedule-button-list';

export function getPeriod(value: PeriodType, hour: number) {
  switch (value) {
  case 'morning':
    return hour >= 5 && hour <= 12;
  case 'afternoon':
    return hour > 12 && hour <= 18;
  case 'night':
    return hour > 18 && hour <= 23;
  }
}
