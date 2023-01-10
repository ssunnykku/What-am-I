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
const Community = lazy(() => import('./pages/CommunityPage'));
const ReviewBoard = lazy(() => import('./pages/ReviewBoardPage'));
const Login = lazy(() => import('./pages/LoginPage'));
const Register = lazy(() => import('./pages/RegisterPage'));
const MyPage = lazy(() => import('./pages/MyPage'));
const LikedCommunity = lazy(() => import('./pages/LikedCommuPage'));
const AIResultCard = lazy(() => import('./pages/AIResultCardPage'));
const AILoading = lazy(() => import('./pages/AILoadingPage'));
const CommuChat = lazy(() => import('./pages/CommuChatPage'));
const ChatRoom = lazy(() => import('./pages/ChatRoomPage'));

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/likedcommunity" element={<LikedCommunity />} />
          <Route path="/airesultcard" element={<AIResultCard />} />
          <Route path="/ailoading" element={<AILoading />} />
          <Route path="/commuchat" element={<CommuChat />} />
          <Route path="/chatroom" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default MyRouter;
