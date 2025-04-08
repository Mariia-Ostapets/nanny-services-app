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

export default function NanniesList({ showFavorites = false }) {
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

  useEffect(() => {
    if (showFavorites) {
      dispatch(fetchFavorites());
    } else {
      dispatch(fetchNannies({ sortBy }));
    }
  }, [dispatch, sortBy, showFavorites]);

  const handleToggleFavorite = async nannie => {
    try {
      await dispatch(toggleFavorite(nannie)).unwrap();
      if (showFavorites) {
        dispatch(fetchFavorites());
      }
    } catch (error) {
      console.error(error);
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

  return (
    <ul className={css.nanniesList}>
      {nannies.map((item, index) => (
        <li className={css.nanniesItem} key={item.id} data-nannie-card>
          <NannnieCard
            nannie={item}
            onToggleFavorite={() => handleToggleFavorite(item)}
            showFavorites={showFavorites}
          />
        </li>
      ))}
    </ul>
  );
}
