import css from './FavoritesPage.module.css';
import NanniesList from '../../components/NanniesList/NanniesList';
import { useSelector } from 'react-redux';
import { selectFavorites } from '../../redux/auth/selectors';

export default function FavoritesPage() {
  const favorites = useSelector(selectFavorites);

  return (
    <div className={css.favoritesPageContainer}>
      <NanniesList showFavorites={true} />
    </div>
  );
}
