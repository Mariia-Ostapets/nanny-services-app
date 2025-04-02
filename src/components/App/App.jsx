import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../ui/Layout/Layout.jsx';
import PrivateRoute from '../ui/PrivateRoute.jsx';
import Notification from '../ui/Notification/Notification.jsx';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const NanniesPage = lazy(() =>
  import('../../pages/NanniesPage/NanniesPage.jsx')
);
const FavoritesPage = lazy(() =>
  import('../../pages/FavoritesPage/FavoritesPage.jsx')
);
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);

export default function App() {
  return (
    <>
      <Notification />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/nannies" element={<NanniesPage />} />
          <Route
            path="/favorites"
            element={<PrivateRoute component={<FavoritesPage />} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
