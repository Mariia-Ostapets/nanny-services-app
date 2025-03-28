import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.pageHeader}>
      <p>Nanny.Services</p>
      <nav className={css.headerNavMenu}>
        <a>Home</a>
        <a>Nannies</a>
      </nav>
    </header>
  );
}
