import Header from '../../Header/Header';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import css from './Layout.module.css';
import clsx from 'clsx';

export default function Layout() {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  return (
    <div
      className={clsx(
        css.container,
        css.containerHome,
        !isHomePage && css.containerNannies
      )}
    >
      <div
        className={clsx(
          css.layoutWrapperHome,
          !isHomePage && css.layoutWrapperNannies
        )}
      >
        <Header type={isHomePage} />
        <main>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </main>
        <Modal className={css.modalOverlay} />
      </div>
    </div>
  );
}
