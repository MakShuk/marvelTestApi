import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import {SingleComicLayout} from '../pages/index'
import { lazy, Suspense } from 'react';
import decoration from '../../resources/img/vision.png';
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../comicsPage/ComicsPage'));
/* const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout')); */


const App = () => {
  return (
    <Router>
      <Suspense fallback={<Spinner></Spinner>}>
        <div className="app">
          <AppHeader />
          <main>
            <Routes>
              <Route path="" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="/comics/:comicId" element={<SingleComicLayout />} />
              <Route path="*" element={<Page404 to="/" replace />} />
            </Routes>
            <img className="bg-decoration" src={decoration} alt="vision" />
          </main>
        </div>
      </Suspense>
    </Router>
  );
};

export default App;
