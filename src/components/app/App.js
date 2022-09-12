import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import {MainPage, ComicsPage, Page404} from '../pages/index'

import decoration from '../../resources/img/vision.png';


const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="" element={<MainPage />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route path="*" element={<Page404 to="/" replace />} />
          </Routes>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    </Router>
  );
};

export default App;  