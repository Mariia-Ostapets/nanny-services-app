import css from './FavoritesPage.module.css';
import NanniesList from '../../components/NanniesList/NanniesList';
import { selectFavorites } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';

export default function FavoritesPage() {
  const favorites = useSelector(selectFavorites);

  return (
    <div className={css.favoritesPageContainer}>
      {favorites.length > 0 ? (
        <NanniesList showFavorites={true} />
      ) : (
        <p className={css.favoritesPageText}>
          You do not have a favorites list yet
        </p>
      )}
    </div>
  );
}
