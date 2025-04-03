import { useState } from 'react';
import css from './Filters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetNannies, setFilter } from '../../redux/nannies/slice';
import { getNannies } from '../../redux/nannies/operations';
import { selectFilter } from '../../redux/nannies/selectors';

const options = [
  'A to Z',
  'Z to A',
  'Lower price',
  'Higher price',
  'Popular',
  'Not popular',
  'Show all',
];

// const selectOptions = options.map(option => ({
//   filter: option,
//   label: option,
// }));

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
    <div className={css.filtersWrapper}>
      <h2 className={css.filtersTitle}>Filters</h2>
      <div
        className={css.filtersField}
        onClick={handleToggle}
        aria-expanded={openFilter}
      >
        <div className={css.filter} onClick={handleToggle}>
          <span className={css.filterName}>{selectedFilter}</span>
          <svg className={css.filterIcon}>
            <use href="/sprite.svg#icon-chevron" />
          </svg>
        </div>
        {openFilter && (
          <ul className={css.filtersList}>
            {options.map(option => (
              <li key={option} onClick={() => handleFilterChange(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
