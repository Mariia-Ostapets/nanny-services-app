import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Filters from '../../components/Filters/Filters';
import NanniesList from '../../components/NanniesList/NanniesList';
import Button from '../../components/ui/Button/Button';
import css from './NanniesPage.module.css';
import { getNannies } from '../../redux/nannies/operations';
import {
  selectFilter,
  selectHasMore,
  selectLastKey,
  selectLoading,
  selectPage,
} from '../../redux/nannies/selectors';
import { incrementPage, resetNannies } from '../../redux/nannies/slice';

export default function NanniesPage() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const lastKey = useSelector(selectLastKey);
  const hasMore = useSelector(selectHasMore);
  const loading = useSelector(selectLoading);
  const page = useSelector(selectPage);

  // useEffect(() => {
  //   dispatch(resetNannies());
  //   dispatch(getNannies({ filter }));
  // }, [dispatch, filter]);

  const handleLoadMore = () => {
    if (filter === 'Show all') {
      dispatch(getNannies({ filter, lastKey }));
    } else {
      dispatch(incrementPage());
      dispatch(getNannies({ filter, page: page + 1 }));
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
