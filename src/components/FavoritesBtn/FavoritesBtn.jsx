import css from './FavoritesBtn.module.css';
import Button from '../../components/ui/Button/Button';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFavorites,
  selectIsLoggedIn,
  selectUserUid,
} from '../../redux/auth/selectors';
import toast from 'react-hot-toast';
import { toggleFavorite } from '../../redux/auth/operations';

export default function FavoritesBtn({ nannie }) {
  const dispatch = useDispatch();
  const uid = useSelector(selectUserUid);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favorites = useSelector(selectFavorites);

  const isFavorite = favorites.includes(nannie.id);

  const handleFavorites = () => {
    if (isLoggedIn) {
      console.log('nannie:', nannie);
      dispatch(toggleFavorite(nannie.id));
      console.log('favorites:', favorites);
      console.log('isFavorite:', isFavorite);
    } else {
      toast.error('Please authorize to add a nannie to your favorites list.');
    }
  };

  return (
    <Button type="button" variant="favorites" onClick={handleFavorites}>
      <svg
        className={isFavorite ? css.iconHeartBlue : css.iconHeart}
        width="26"
        height="26"
      >
        <use
          href={
            isFavorite
              ? '/sprite.svg#icon-heart-blue'
              : '/sprite.svg#icon-heart'
          }
        />
      </svg>
    </Button>
  );
}
