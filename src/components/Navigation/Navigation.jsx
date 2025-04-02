import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export default function Navigation({ type, isNanniesHeader }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && isNanniesHeader && css.active);
  };

  return (
    <nav className={css.navMenu}>
      <ul className={css.navList}>
        <li>
          <NavLink className={buildLinkClass} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={buildLinkClass} to="nannies">
            Nannies
          </NavLink>
        </li>
        {!type && isLoggedIn && (
          <li>
            <NavLink className={buildLinkClass} to="favorites">
              Favorites
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
