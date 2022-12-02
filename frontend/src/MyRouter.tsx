import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomSpinner from './components/loader/CustomSpinner';
import NavBar from './components/nav/NavBar';

const MainPage = lazy(() => import('./pages/MainPage'));
const AITest = lazy(() => import('./pages/AITestPage'));
const AITestResult = lazy(() => import('./pages/AITestResultPage'));
const Community = lazy(() => import('./pages/CommunityPage'));
const ReviewBoard = lazy(() => import('./pages/ReviewBoardPage'));
const Login = lazy(() => import('./pages/LoginPage'));
const Register = lazy(() => import('./pages/RegisterPage'));
const MyPage = lazy(() => import('./pages/MyPage'));
const LikedCommunity = lazy(() => import('./pages/LikedCommuPage'));

const MyRouter = () => {
  return (
    <Suspense fallback={<CustomSpinner />}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/dna" element={<AITest />} />
          <Route path="/dnaresult" element={<AITestResult />} />
          <Route path="/board" element={<ReviewBoard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/likedcommunity" element={<LikedCommunity />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default MyRouter;
