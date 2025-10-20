import { Input } from '@/components/input';
import { formatDate } from '@/utils/format-date';
import { CalendarBlankIcon, CaretDownIcon, CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import type { ComponentProps, JSX } from 'react';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface DatePickerProps extends Omit<ComponentProps<'input'>, 'value'> {
  left?: boolean;
  filterDate?: Date
  onDate: (dateValue: Date) => void;
}

const MONTHS_PT = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const WEEKDAYS_PT = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export function DatePicker({
  left = false,
  className,
  filterDate,
  onDate,
  ...props
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(filterDate || new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sincroniza currentMonth e currentYear com selectedDate quando o calendário abre
  useEffect(() => {
    if (isOpen) {
      setCurrentMonth(selectedDate.getMonth());
      setCurrentYear(selectedDate.getFullYear());
    }
  }, [isOpen, selectedDate]);

  function getDaysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  };

  function getFirstDayOfMonth(month: number, year: number) {
    return new Date(year, month, 1).getDay();
  };

  function handleDateSelect(day: number, isPrevMonth = false, isNextMonth = false) {
    let month = currentMonth;
    let year = currentYear;

    if (isPrevMonth) {
      if (month === 0) {
        month = 11;
        year = year - 1;
      } else {
        month = month - 1;
      }
    } else if (isNextMonth) {
      if (month === 11) {
        month = 0;
        year = year + 1;
      } else {
        month = month + 1;
      }
    }

    const newDate = new Date(year, month, day);
    setSelectedDate(newDate);
    onDate(newDate);
    setIsOpen(false);
  };

  function handlePrevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prevState) => prevState - 1);
    } else {
      setCurrentMonth((preveState) => preveState - 1);
    }
  };

  function handleNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prevState) => prevState + 1);
    } else {
      setCurrentMonth((prevstate) => prevstate + 1);
    }
  };

  function handleCalendarOpen() {
    // Sincroniza com a data selecionada antes de abrir
    setCurrentMonth(selectedDate.getMonth());
    setCurrentYear(selectedDate.getFullYear());
    setIsOpen(true);
  }

  function renderCalendarDays(): JSX.Element[] {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInPrevMonth = getDaysInMonth(currentMonth - 1, currentYear);

    const today = new Date();
    const currentDay = today.getDate();
    const currentMonthIndex = today.getMonth();
    const currentYearValue = today.getFullYear();

    const days: JSX.Element[] = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const prevMonthDay = daysInPrevMonth - i;
      days.push(
        <button
          key={`prev-${i}`}
          className="h-10 w-10 text-md text-gray-400 hover:text-gray-400 transition-colors"
          onClick={() => {
            handleDateSelect(prevMonthDay, true);
          }}
        >
          {prevMonthDay}
        </button>,
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        day === selectedDate.getDate() &&
        currentMonth === selectedDate.getMonth() &&
        currentYear === selectedDate.getFullYear();

      const isToday =
        day === currentDay &&
        currentMonth === currentMonthIndex &&
        currentYear === currentYearValue;

      days.push(
        <button
          key={`current-${day}`}
          data-today={isToday}
          data-selected={isSelected}
          onClick={() => handleDateSelect(day)}
          className={twMerge(
            'size-9 rounded-md transition-all underline-offset-8',
            'hover:bg-gray-800 hover:text-white text-gray-200 data-[today=true]:text-gray-100 data-[today=true]:underline data-[selectednewDate=true]:border-2 data-[selected=true]:border-yellow-dark data-[selected=true]:text-gray-100 data-[selected=true]:font-bold data-[selected=true]:bg-gray-500',
          )}
        >
          {day}
        </button>,
      );
    }

    // Next month days to fill the grid
    const totalCells = days.length;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);

    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <button
          key={`next-${day}`}
          className="h-10 w-10 text-md text-gray-400 hover:text-gray-400 transition-colors"
          onClick={() => {
            handleDateSelect(day, false, true);
          }}
        >
          {day}
        </button>,
      );
    }

    return days;
  };

  return (
    <div ref={containerRef} className={twMerge('relative', className)}>
      <div className="relative">
        <Input
          icon={CalendarBlankIcon}
          type="text"
          value={formatDate(filterDate || selectedDate)}
          readOnly
          onFocus={handleCalendarOpen}
          className="cursor-pointer pr-12"
          {...props}
        />
        <button onClick={handleCalendarOpen} className="absolute right-3 top-1/2 -translate-y-1/2">
          <CaretDownIcon className={twMerge('w-5 h-5 text-gray-400 transition-transform', isOpen && '-rotate-180')} />
        </button>
      </div>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className={twMerge('absolute top-full  mt-2 p-4 bg-gray-600 border border-gray-500 rounded-lg shadow-2xl z-10 min-w-80', left ? '-left-44' : 'left-0 right-0')}>
          {/* Month/Year Header */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-800 rounded transition-colors">
              <CaretLeftIcon className="w-5 h-5 text-gray-400" />
            </button>
            <span className="text-gray-100 font-medium">
              {MONTHS_PT[currentMonth]} {currentYear}
            </span>
            <button onClick={handleNextMonth} className="p-1 hover:bg-gray-800 rounded transition-colors">
              <CaretRightIcon className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 mb-2">
            {WEEKDAYS_PT.map((day, index) => (
              <div key={index} className="h-10 flex items-center justify-center text-gray-300 font-bold">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-yellow">{renderCalendarDays()}</div>
        </div>
      )}
    </div>
  );
}
