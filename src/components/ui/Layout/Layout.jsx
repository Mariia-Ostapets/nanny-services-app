import Header from '../../Header/Header';
import Container from '../Container/Container';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import css from './Layout.module.css';

export default function Layout() {
  return (
    <div className={css.layoutWrapper}>
      <Header />
      <main>
        <Container>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Container>
      </main>
      <Modal className={css.modalOverlay} />
    </div>
  );
}
