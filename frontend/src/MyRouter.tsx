import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Nav = lazy(() => import('./components/nav/Nav'));
const ReviewBoard = lazy(() => import('./pages/ReviewBoardPage'));
const Login = lazy(() => import('./pages/LoginPage'));
const Register = lazy(() => import('./pages/RegisterPage'));

const MyRouter = () => {
  return (
    <Suspense>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/board" element={<ReviewBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default MyRouter;
