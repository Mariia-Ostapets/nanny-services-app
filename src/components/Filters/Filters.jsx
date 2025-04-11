import { useRef, useEffect } from 'react';
import css from './Filters.module.css';

export default function Filters({
  value,
  options,
  onChange,
  isOpen,
  setOpenSelector,
}) {
  const selectorRef = useRef(null);

  const handleSelect = option => {
    onChange(option.value);
    setOpenSelector(false);
  };

  const handleToggle = () => {
    setOpenSelector(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = e => {
      if (selectorRef.current && !selectorRef.current.contains(e.target)) {
        setOpenSelector(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setOpenSelector]);

  return (
    <div className={css.filterWrapper} ref={selectorRef}>
      <div className={css.filterContainer} onClick={handleToggle}>
        <div>{value}</div>
        <svg width="20" height="20">
          <use href="/sprite.svg#icon-chevron-down" />
        </svg>
        {isOpen && (
          <ul className={css.filterList}>
            {options.map(option => (
              <li
                className={css.filterItem}
                key={option.value}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
