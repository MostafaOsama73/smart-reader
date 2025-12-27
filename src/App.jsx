import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ArticleHub from './components/ArticleHub';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<ArticleHub />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
