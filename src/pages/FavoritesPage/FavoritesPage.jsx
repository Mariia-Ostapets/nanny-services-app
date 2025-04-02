import css from './FavoritesPage.module.css';
import Filters from '../../components/Filters/Filters';
import NanniesList from '../../components/NanniesList/NanniesList';
import Button from '../../components/ui/Button/Button';

export default function FavoritesPage() {
  return (
    <div className={css.favoritesPageContainer}>
      <Filters />
      <NanniesList />
      <Button type="button" variant="loadMore">
        Load more
      </Button>
    </div>
  );
}
