import { useDispatch, useSelector } from 'react-redux';
import css from './NanniesList.module.css';
import {
  selectHasMore,
  selectItems,
  selectLastKey,
  selectLoading,
  selectPage,
  selectSortBy,
} from '../../redux/nannies/selectors';
import { useEffect, useRef, useState } from 'react';
import NannnieCard from '../NannieCard/NannieCard';
import {
  selectFavorites,
  selectFavoritesHasMore,
  selectFavoritesLastKey,
  selectFavoritesPage,
  selectFavoritesSortBy,
  selectUserIsLoading,
} from '../../redux/auth/selectors';
import Loader from '../ui/Loader/Loader';
import { fetchNannies } from '../../redux/nannies/operations';
import { fetchFavorites, toggleFavorite } from '../../redux/auth/operations';
import Button from '../ui/Button/Button';
import Filters from '../Filters/Filters';
import { incrementPage, setSortBy } from '../../redux/nannies/slice';
import { setSortByFavorites } from '../../redux/auth/slice';

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

export default function NanniesList({ showFavorites = false }) {
  const [openSelector, setOpenSelector] = useState(null);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const dispatch = useDispatch();

  const nannies = useSelector(showFavorites ? selectFavorites : selectItems);
  const sortBy = useSelector(
    showFavorites ? selectFavoritesSortBy : selectSortBy
  );
  const loading = useSelector(
    showFavorites ? selectUserIsLoading : selectLoading
  );
  const lastKey = useSelector(
    showFavorites ? selectFavoritesLastKey : selectLastKey
  );
  const page = useSelector(showFavorites ? selectFavoritesPage : selectPage);
  const hasMore = useSelector(
    showFavorites ? selectFavoritesHasMore : selectHasMore
  );

  const handleFilterChange = newFilter => {
    if (showFavorites) {
      dispatch(setSortByFavorites(newFilter));
      dispatch(fetchFavorites({ sortBy: newFilter }));
    } else {
      dispatch(setSortBy(newFilter));
      dispatch(fetchNannies({ sortBy: newFilter }));
    }
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

  useEffect(() => {
    if (showFavorites) {
      dispatch(fetchFavorites({ sortBy, page }));
    } else {
      dispatch(fetchNannies({ sortBy }));
    }
  }, [dispatch, sortBy, showFavorites, page]);

  const handleToggleFavorite = async nannie => {
    try {
      await dispatch(toggleFavorite(nannie)).unwrap();
      if (showFavorites) {
        dispatch(fetchFavorites());
      }
    } catch (error) {
      console.error('❌ Failed to toggle favorite:', error);
    }
  };

  const prevLengthRef = useRef(0);

  useEffect(() => {
    if (isLoadMore && nannies.length > prevLengthRef.current) {
      const allCards = document.querySelectorAll('[data-nannie-card]');
      const newCard = allCards[prevLengthRef.current];
      if (newCard) {
        newCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    prevLengthRef.current = nannies.length;
  }, [nannies]);

  const handleLoadMore = () => {
    setIsLoadMore(true);
    if (showFavorites) {
      dispatch(incrementFavoritesPage({ sortBy, lastKey }));
      dispatch(fetchFavorites({ sortBy, page: page + 1 }));
    } else {
      if (sortBy === 'Show all') {
        dispatch(fetchNannies({ sortBy, lastKey }));
      } else {
        dispatch(incrementPage({ sortBy, lastKey }));
        dispatch(fetchNannies({ sortBy, page: page + 1 }));
      }
    }
  };

  const isNoResults = nannies.length === 0;

  return (
    <>
      <h2 className={css.filterTitle}>Filters</h2>
      <Filters
        options={selectOptions}
        value={sortBy}
        onChange={handleFilterChange}
        isOpen={openSelector}
        setOpenSelector={setOpenSelector}
      />
      {isNoResults && (
        <p className={css.noResultsText}>
          No nannies found matching the filter criteria.
        </p>
      )}
      <ul className={css.nanniesList}>
        {nannies.map(item => (
          <li className={css.nanniesItem} key={item.id} data-nannie-card>
            <NannnieCard
              nannie={item}
              onToggleFavorite={() => handleToggleFavorite(item)}
              showFavorites={showFavorites}
            />
          </li>
        ))}
      </ul>
      {hasMore && !loading && (
        <Button type="button" variant="loadMore" onClick={handleLoadMore}>
          Load more
        </Button>
      )}
    </>
  );
}
