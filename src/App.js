import './App.css';

// React Router
import { Route, Routes } from 'react-router-dom';
import Login from './views/Login';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>} />
      </Routes>
    </div>
  );
}
