import Filters from '../../components/Filters/Filters';
import NanniesList from '../../components/NanniesList/NanniesList';
import Button from '../../components/ui/Button/Button';
import css from './NanniesPage.module.css';

export default function NanniesPage() {
  return (
    <div className={css.nanniesPageContainer}>
      <Filters />
      <NanniesList />
      <Button type="button" variant="loadMore">
        Load more
      </Button>
    </div>
  );
}
