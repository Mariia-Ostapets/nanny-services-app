import { useDispatch, useSelector } from 'react-redux';
import css from './NanniesList.module.css';
import {
  selectError,
  selectFilter,
  selectHasMore,
  selectItems,
  selectLastKey,
  selectLoading,
  selectPage,
} from '../../redux/nannies/selectors';
import { useEffect } from 'react';
import { getNannies } from '../../redux/nannies/operations';
import NannnieCard from '../NannieCard/NannieCard';
import { selectFavorites } from '../../redux/auth/selectors';
import { incrementPage, resetNannies } from '../../redux/nannies/slice';

export default function NanniesList() {
  const dispatch = useDispatch();

  const nannies = useSelector(selectItems);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const favorites = useSelector(selectFavorites);
  const filter = useSelector(selectFilter);
  const lastKey = useSelector(selectLastKey);
  const page = useSelector(selectPage);
  const hasMore = useSelector(selectHasMore);

  useEffect(() => {
    dispatch(resetNannies());
    dispatch(getNannies({ filter }));
  }, [dispatch, filter]);

  console.log('Nannies:', nannies);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (nannies.length === 0) return <p>No nannies found.</p>;

  return (
    <ul className={css.nanniesList}>
      {nannies.map(item => (
        <li key={item.id}>
          <NannnieCard
            nannie={item}
            // onToggleFavorite={() => dispatch(toggleFavorite(item))}
          />
        </li>
      ))}
    </ul>
  );
}
