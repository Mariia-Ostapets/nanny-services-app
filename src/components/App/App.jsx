import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../ui/Layout/Layout.jsx';
import PrivateRoute from '../ui/PrivateRoute.jsx';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const NanniesPage = lazy(() =>
  import('../../pages/NanniesPage/NanniesPage.jsx')
);
const FavouritesPage = lazy(() =>
  import('../../pages/FavouritesPage/FavouritesPage')
);
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/nannies" element={<NanniesPage />} />
          <Route
            path="/favourites"
            element={<PrivateRoute component={<FavouritesPage />} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
