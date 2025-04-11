import css from './FavoritesBtn.module.css';
import Button from '../../components/ui/Button/Button';
import { useSelector } from 'react-redux';
import { selectFavoriteIds } from '../../redux/auth/selectors';

export default function FavoritesBtn({ nannie, onClick }) {
  const favoriteIds = useSelector(selectFavoriteIds);
  const isFavorite = favoriteIds.includes(nannie.id);

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
