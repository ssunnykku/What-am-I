import { lazy, Suspense } from 'react';
import {
  BrowserRouter as BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { CustomSpinner } from './components/loader/CustomSpinner';
import NavBar from './components/nav/NavBar';

const MainPage = lazy(() => import('./pages/MainPage'));
const AITest = lazy(() => import('./pages/AITestPage'));
const AITestResult = lazy(() => import('./pages/AITestResultPage'));
const ReviewBoard = lazy(() => import('./pages/ReviewBoardPage'));
const Community = lazy(() => import('./pages/CommunityPage'));
const Map = lazy(() => import('./pages/MapPage'));
const Login = lazy(() => import('./pages/LoginPage'));
const Register = lazy(() => import('./pages/RegisterPage'));
const MyPage = lazy(() => import('./pages/MyPage'));
const LikedCommunity = lazy(() => import('./pages/LikedCommuPage'));
const AIResultCard = lazy(() => import('./pages/AIResultCardPage'));
const AILoading = lazy(() => import('./pages/AILoadingPage'));

const MyRouter = () => {
  return (
    <Suspense fallback={<CustomSpinner />}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/dna" element={<AITest />} />
          <Route path="/dnaresult" element={<AITestResult />} />
          <Route path="/reviewboard" element={<ReviewBoard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/map" element={<Map />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/likedcommunity" element={<LikedCommunity />} />
          <Route path="/airesultcard" element={<AIResultCard />} />
          <Route path="/ailoading" element={<AILoading />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default MyRouter;
