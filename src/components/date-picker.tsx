import { Input } from '@/components/input';
import { CalendarBlankIcon, CaretLeftIcon, CaretRightIcon, CaretUpIcon } from '@phosphor-icons/react';
import type { JSX } from 'react';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date) => void
  className?: string
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
  value, onChange, className,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(value || new Date());
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

  function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  function getDaysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  };

  function getFirstDayOfMonth(month: number, year: number) {
    return new Date(year, month, 1).getDay();
  };

  function handleDateSelect(day: number) {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
    onChange?.(newDate);
    setIsOpen(false);
  };

  function handlePrevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  function handleNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  function renderCalendarDays(): JSX.Element[] {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInPrevMonth = getDaysInMonth(currentMonth - 1, currentYear);

    const today = new Date().getDate();

    const days: JSX.Element[] = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <button
          key={`prev-${i}`}
          className="h-10 w-10 text-sm text-gray-400 hover:text-gray-400 transition-colors"
          onClick={() => {
            handlePrevMonth();
            handleDateSelect(daysInPrevMonth - i);
          }}
        >
          {daysInPrevMonth - i}
        </button>,
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        day === selectedDate.getDate() &&
        currentMonth === selectedDate.getMonth() &&
        currentYear === selectedDate.getFullYear();

      days.push(
        <button
          key={`current-${day}`}
          data-today={day === today && currentMonth === selectedDate.getMonth() }
          data-selected={isSelected}
          onClick={() => handleDateSelect(day)}
          className={twMerge(
            'size-9 rounded-md transition-all underline-offset-8',
            'hover:bg-gray-800 hover:text-white text-gray-200 data-[today=true]:text-gray-100 data-[today=true]:underline data-[selected=true]:border-2 data-[selected=true]:border-yellow-dark data-[selected=true]:text-gray-100 data-[selected=true]:font-bold data-[selected=true]:bg-gray-500',
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
          className="h-10 w-10 text-sm text-gray-600 hover:text-gray-400 transition-colors"
          onClick={() => {
            handleNextMonth();
            handleDateSelect(day);
          }}
        >
          {day}
        </button>,
      );
    }

    return days;
  };

  return (
    <div ref={containerRef} className={twMerge('relative w-full max-w-sm', className)}>
      <div className="relative">
        <Input
          icon={CalendarBlankIcon}
          type="text"
          value={formatDate(selectedDate)}
          readOnly
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer pr-12"
        />
        <button onClick={() => setIsOpen(!isOpen)} className="absolute right-3 top-1/2 -translate-y-1/2">
          <CaretUpIcon className={twMerge('w-5 h-5 text-gray-400 transition-transform', isOpen && 'rotate-180')} />
        </button>
      </div>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-gray-600 border border-gray-500 rounded-lg shadow-2xl z-50">
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
