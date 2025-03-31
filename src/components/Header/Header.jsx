import { Link } from 'react-router-dom';
import css from './Header.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import UserMenu from '../UserMenu/UserMenu';
import AuthMenu from '../AuthMenu/AuthMenu';
import Navigation from '../Navigation/Navigation';

export default function Header({ type }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

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
      <div className={css.headerNavAndMenuWrapper}>
        <Navigation type={type} />
        {isLoggedIn ? <UserMenu /> : <AuthMenu />}
      </div>
    </header>
  );
}
