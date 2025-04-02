import css from './Filters.module.css';

export default function Filters() {
  return (
    <form className={css.filtersForm}>
      <h2 className={css.filtersFormTitle}>Filters</h2>{' '}
      <input className={css.filtersFormInput} />
    </form>
  );
}
