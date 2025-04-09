import NanniesList from '../../components/NanniesList/NanniesList';
import css from './NanniesPage.module.css';

export default function NanniesPage() {
  return (
    <div className={css.nanniesPageContainer}>
      <NanniesList />
    </div>
  );
}
