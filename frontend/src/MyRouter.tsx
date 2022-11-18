import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const ReviewBoard = lazy(() => import('./pages/ReviewBoardPage'));
const Login = lazy(() => import('./pages/LoginPage'));

const MyRouter = () => {
  return (
    <Suspense>
      <BrowserRouter>
        <Routes>
          <Route path="/board" element={<ReviewBoard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default MyRouter;
