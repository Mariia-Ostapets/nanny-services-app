import { Link } from 'react-router-dom';
import css from './Header.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import UserMenu from '../UserMenu/UserMenu';
import AuthMenu from '../AuthMenu/AuthMenu';
import Navigation from '../Navigation/Navigation';
import { useState } from 'react';
import ModalForm from '../ui/ModalForm/ModalForm';

export default function Header({ type }) {
  const [modalContent, setModalContent] = useState(null);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const openModal = content => setModalContent(content);
  const closeModal = () => setModalContent(null);

  return (
    <>
      <header
        className={clsx(type && css.headerHome, !type && css.headerNannies)}
      >
        <div
          className={clsx(
            type && css.headerContainerHome,
            !type && css.headerContainerNannies
          )}
        >
          <Link className={css.logo} to="/">
            Nanny.Services
          </Link>
          <div
            className={clsx(
              type && css.headerNavAndMenuWrapper,
              !type && css.headerNavAndMenuWrapperNannies
            )}
          >
            <Navigation type={type} isNanniesHeader={!type} />
            {isLoggedIn ? (
              <UserMenu closeModal={closeModal} />
            ) : (
              <AuthMenu openModal={openModal} closeModal={closeModal} />
            )}
          </div>
          <ModalForm modalIsOpen={!!modalContent} closeModal={closeModal}>
            {modalContent}
          </ModalForm>
        </div>
      </header>
    </>
  );
}
