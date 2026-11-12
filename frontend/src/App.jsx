import AOS from 'aos';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }, []);

  useEffect(() => {
    AOS.refreshHard();
  }, [pathname]);

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
