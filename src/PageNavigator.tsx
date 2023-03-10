import { Route, Routes } from 'react-router-dom';
import BoastBoardPage from './page/BoastBoardPage';
import LoginPage from './page/LoginPage';
import MainPage from './page/MainPage';
import NoticeBoardPage from './page/NoticeBoardPage';
import PersonalDrinkPage from './page/PersonalDrinkPage';
import PersonalSnackPage from './page/PersonalSnackPage';
import PersonalSolutionPage from './page/PersonalSolutionPage';
import PostDetailPage from './page/PostDetailPage';
import SearchPage from './page/SearchPage';
import SignUpPage from './page/SignUpPage';
import SuggestPage from './page/SuggestPage';
import TotalBoardPage from './page/TotalBoardPage';
import UpdatePage from './page/UpdatePage';
import WritePage from './page/WritePage';

const PageNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/board" element={<TotalBoardPage />} />
      <Route path="/board/notice" element={<NoticeBoardPage />} />
      <Route path="/board/boast" element={<BoastBoardPage />} />
      <Route path="/board/drink" element={<PersonalDrinkPage />} />
      <Route path="/board/snack" element={<PersonalSnackPage />} />
      <Route path="/board/solution" element={<PersonalSolutionPage />} />
      <Route path="/board/suggest" element={<SuggestPage />} />
      <Route path="/board/:id" element={<PostDetailPage />} />
      <Route path="/write" element={<WritePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/update/:id" element={<UpdatePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
};

export default PageNavigator;
