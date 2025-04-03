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
import { useEffect, useRef } from 'react';
import { getNannies } from '../../redux/nannies/operations';
import NannnieCard from '../NannieCard/NannieCard';
import { selectFavorites } from '../../redux/auth/selectors';
import { incrementPage, resetNannies } from '../../redux/nannies/slice';
import Loader from '../ui/Loader/Loader';

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

  const lastNannyRef = useRef(null); // Створюємо ref

  useEffect(() => {
    if (lastNannyRef.current) {
      lastNannyRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [nannies]); // Виконувати, коли додаються нові няні

  if (loading) return <Loader />;
  if (error) return toast.error('Nannies loading error');
  if (nannies.length === 0) return <p>No nannies found.</p>;

  return (
    <ul className={css.nanniesList}>
      {nannies.map((item, index) => (
        <li
          className={css.nanniesItem}
          key={item.id}
          ref={index === nannies.length - 1 ? lastNannyRef : null}
        >
          <NannnieCard
            nannie={item}
            // onToggleFavorite={() => dispatch(toggleFavorite(item))}
          />
        </li>
      ))}
    </ul>
  );
}
