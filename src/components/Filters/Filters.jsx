import { useState } from 'react';
import css from './Filters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetNannies, setFilter } from '../../redux/nannies/slice';
import { getNannies } from '../../redux/nannies/operations';
import { selectFilter } from '../../redux/nannies/selectors';

const options = [
  'A to Z',
  'Z to A',
  'Less than 10$',
  'Greater than 10$',
  'Popular',
  'Not popular',
  'Show all',
];

export default function Filters() {
  const [openFilter, setOpenFilter] = useState(false);
  const currentFilter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState(
    currentFilter || 'Show all'
  );

  const handleFilterChange = newFilter => {
    setSelectedFilter(newFilter);
    dispatch(setFilter(newFilter));
    dispatch(resetNannies());
    dispatch(getNannies({ filter: newFilter }));
    setOpenFilter(false);
  };

  const handleToggle = () => {
    setOpenFilter(prev => !prev);
  };

  return (
    <div className={css.filterWrapper}>
      <h2 className={css.filterTitle}>Filters</h2>
      <div
        className={css.filterContainer}
        onClick={handleToggle}
        aria-expanded={openFilter}
      >
        <div>{selectedFilter}</div>
        <svg width="20" height="20">
          <use href="/sprite.svg#icon-chevron-down" />
        </svg>
        {openFilter && (
          <ul className={css.filterList}>
            {options.map(option => (
              <li
                className={css.filterItem}
                key={option}
                onClick={() => handleFilterChange(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
