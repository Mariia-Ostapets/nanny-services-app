import { Link } from 'react-router-dom';
import css from './Header.module.css';
import clsx from 'clsx';

export default function Header({ type }) {
  return (
    <header
      className={clsx(
        css.header,
        type && css.headerHome,
        !type && css.headerNannies
      )}
    >
      <Link to="/">Nanny.Services</Link>
      <div>
        <nav className={css.headerNavMenu}>
          <ul className={css.headerNavList}>
            <li>Home</li>
            <li>Nannies</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
