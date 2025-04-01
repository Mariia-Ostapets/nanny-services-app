import { useDispatch, useSelector } from 'react-redux';
import css from './UserMenu.module.css';
import { selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';
import Button from '../ui/Button/Button';

export default function UserMenu() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const handleLogOut = async () => {
    dispatch(logOut());
  };

  console.log('User from Redux:', user);

  return (
    <div>
      <div className={css.userMenuContainer}>
        <svg className={css.userMenuIcon} width={24} height={24}>
          <use href="/sprite.svg#icon-user" />
        </svg>
      </div>
      <p className={css.userMenuName}>{user.name}</p>
      <Button type="button" variant="logOut" onClick={handleLogOut}>
        Log out
      </Button>
    </div>
  );
}
