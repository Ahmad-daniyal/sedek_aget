import { Route, Routes } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout.jsx';
import ExplorePage from '../pages/ExplorePage.jsx';
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import MapPage from '../pages/MapPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="jelajah" element={<ExplorePage />} />
        <Route path="peta" element={<MapPage />} />
        <Route path="masuk" element={<LoginPage />} />
        <Route path="daftar" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
