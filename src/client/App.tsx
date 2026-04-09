import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
// @ts-ignore
import '@mantine/core/styles.css';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import WelcomePage from './pages/WelcomePage';

export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}