import Header from '../../Header/Header';
import Loader from '../Loader/Loader';
import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import css from './Layout.module.css';
import clsx from 'clsx';

export default function Layout() {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  return (
    <>
      <Header type={isHomePage} />
      <main>
        <div className={clsx(!isHomePage && css.layoutBgr)}>
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
              <Suspense fallback={<Loader />}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
