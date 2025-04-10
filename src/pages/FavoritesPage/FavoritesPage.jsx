import css from './FavoritesPage.module.css';
import NanniesList from '../../components/NanniesList/NanniesList';
import { useSelector } from 'react-redux';
import { selectFavorites } from '../../redux/auth/selectors';
import FavoritesList from '../../components/FavoritesList/FavoritesList';

export default function FavoritesPage() {
  const favorites = useSelector(selectFavorites);

  return (
    <div className={css.favoritesPageContainer}>
      {/* {favorites.length > 0 ? (
        <NanniesList showFavorites={true} />
      ) : (
        <p className={css.noResultsText}>
          You do not have a favorites list yet
        </p>
      )} */}

      <NanniesList showFavorites={true} />

      {/* {favorites.length > 0 ? (
        <FavoritesList />
      ) : (
        <p className={css.noResultsText}>
          You do not have a favorites list yet
        </p>
      )} */}
    </div>
  );
}
