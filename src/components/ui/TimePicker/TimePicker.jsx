import { useState, useRef, useEffect } from 'react';
import css from './TimePicker.module.css';

export default function TimePicker({ register, name, setValue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const pickerRef = useRef(null);

  const timeOptions = [];

  for (let hour = 0; hour < 24; hour++) {
    timeOptions.push(`${String(hour).padStart(2, '0')} : 00`);
    timeOptions.push(`${String(hour).padStart(2, '0')} : 30`);
  }

  const handleSelect = time => {
    setSelectedTime(time.replace(/ : /g, ':'));
    setValue(name, time.replace(/ : /g, ':'));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = e => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div className={css.timePickerWrapper} ref={pickerRef}>
      <input
        className={css.timePickerInput}
        type="text"
        placeholder="00:00"
        onFocus={() => setIsOpen(true)}
        value={selectedTime}
        readOnly
        {...register(name)}
      />
      <svg
        className={css.clockIcon}
        width="20"
        height="20"
        onClick={toggleDropdown}
      >
        <use href={'/sprite.svg#icon-clock'} />
      </svg>
      {isOpen && (
        <div className={css.timeDropdown}>
          <p className={css.timeDropdownTitle}>Meeting time</p>
          <ul className={css.timeList}>
            {timeOptions.map(time => (
              <li
                key={time}
                className={`${css.timeOption} ${
                  selectedTime === time.replace(/ : /g, ':') ? css.selected : ''
                }`}
                onClick={() => handleSelect(time)}
              >
                {time}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
