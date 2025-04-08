import css from './FavoritesBtn.module.css';
import Button from '../../components/ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavorites, selectIsLoggedIn } from '../../redux/auth/selectors';
import toast from 'react-hot-toast';
import { toggleFavorite } from '../../redux/auth/operations';

export default function FavoritesBtn({ nannie, onClick }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favorites = useSelector(selectFavorites);

  const isFavorite = favorites.includes(nannie.id);

  return (
    <Button type="button" variant="favorites" onClick={onClick}>
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
