import { useRef, useState, useEffect } from 'react';
import css from './Filters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../../redux/nannies/slice';
import { fetchNannies } from '../../redux/nannies/operations';
import { setSortByFavorites } from '../../redux/auth/slice';
import { fetchFavorites } from '../../redux/auth/operations';
import { selectFavoritesSortBy } from '../../redux/auth/selectors';
import { selectSortBy } from '../../redux/nannies/selectors';

const options = [
  'A to Z',
  'Z to A',
  'Less than 10$',
  'Greater than 10$',
  'Popular',
  'Not popular',
  'Show all',
];

const selectOptions = options.map(option => ({
  value: option,
  label: option,
}));

export default function Filters({ showFavorites = false }) {
  const [openSelector, setOpenSelector] = useState(null);

  const dispatch = useDispatch();

  const sortBy = useSelector(
    showFavorites ? selectFavoritesSortBy : selectSortBy
  );

  const handleFilterChange = newFilter => {
    if (showFavorites) {
      dispatch(setSortByFavorites(newFilter));
      dispatch(fetchFavorites());
    } else {
      dispatch(setSortBy(newFilter));
      dispatch(fetchNannies({ sortBy: newFilter }));
    }
  };

  const handleSelect = option => {
    handleFilterChange(option.sortBy);
    setOpenSelector(false);
  };

  const handleToggle = () => {
    setOpenSelector(prev => !prev);
  };

  const selectorRef = useRef(null);

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
      <h2 className={css.filterTitle}>Filters</h2>
      <div className={css.filterContainer} onClick={handleToggle}>
        <div>{sortBy}</div>
        <svg width="20" height="20">
          <use href="/sprite.svg#icon-chevron-down" />
        </svg>
        {openSelector && (
          <ul className={css.filterList}>
            {selectOptions.map(option => (
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
