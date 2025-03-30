import { Link, NavLink } from 'react-router-dom';
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
      <Link className={css.logo} to="/">
        Nanny.Services
      </Link>
      <div>
        <nav className={css.headerNavMenu}>
          <ul className={css.headerNavList}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="nannies">Nannies</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
