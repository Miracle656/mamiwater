import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DAppDetailPage from './pages/DAppDetailPage';
import RankingsPage from './pages/RankingsPage';
import SubmitPage from './pages/SubmitPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="dapp/:id" element={<DAppDetailPage />} />
          <Route path="rankings" element={<RankingsPage />} />
          <Route path="submit" element={<SubmitPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
