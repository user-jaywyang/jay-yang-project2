import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Selection from './pages/Selection';
import NormalGame from './pages/NormalGame';
import EasyGame from './pages/EasyGame';
import Rules from './pages/Rules';
import Scores from './pages/Scores';
import Login from './pages/Login';
import Register from './pages/Register';
import './css/common.css';
import './css/board.css';

function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Selection />} />
          <Route path="/games/normal" element={<NormalGame />} />
          <Route path="/games/easy" element={<EasyGame />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/scores" element={<Scores />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;