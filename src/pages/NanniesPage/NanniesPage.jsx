import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Filters from '../../components/Filters/Filters';
import NanniesList from '../../components/NanniesList/NanniesList';
import Button from '../../components/ui/Button/Button';
import css from './NanniesPage.module.css';
import { incrementPage } from '../../redux/nannies/slice';
import { fetchNannies } from '../../redux/nannies/operations';
import { incrementFavoritesPage } from '../../redux/auth/slice';
import { fetchFavorites } from '../../redux/auth/operations';
import {
  selectFavorites,
  selectFavoritesHasMore,
  selectFavoritesPage,
  selectFavoritesSortBy,
  selectUserIsLoading,
} from '../../redux/auth/selectors';
import {
  selectHasMore,
  selectItems,
  selectLoading,
  selectPage,
  selectSortBy,
} from '../../redux/nannies/selectors';

export default function NanniesPage({ showFavorites = false }) {
  const [isLoadMore, setIsLoadMore] = useState(false);

  const dispatch = useDispatch();

  const nannies = useSelector(showFavorites ? selectFavorites : selectItems);
  const hasMore = useSelector(
    showFavorites ? selectFavoritesHasMore : selectHasMore
  );
  const loading = useSelector(
    showFavorites ? selectUserIsLoading : selectLoading
  );
  const sortBy = useSelector(
    showFavorites ? selectFavoritesSortBy : selectSortBy
  );
  const page = useSelector(showFavorites ? selectFavoritesPage : selectPage);

  const handleLoadMore = () => {
    setIsLoadMore(true);
    if (showFavorites) {
      dispatch(incrementFavoritesPage());
      dispatch(fetchFavorites());
    } else {
      if (sortBy === 'Show all') {
        dispatch(fetchNannies({ sortBy, lastKey }));
      } else {
        dispatch(incrementPage());
        dispatch(fetchNannies({ sortBy, page: page + 1 }));
      }
    }
  };

  return (
    <div className={css.nanniesPageContainer}>
      <Filters />
      <NanniesList />
      {hasMore && !loading && (
        <Button type="button" variant="loadMore" onClick={handleLoadMore}>
          Load more
        </Button>
      )}
    </div>
  );
}
