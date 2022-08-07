import './App.css';

// React Router
import { Route, Routes } from 'react-router-dom';

// Views
import Login from './views/Login';
import Home from './views/Home';

// Navigation guard
import { RequireAuth } from './common/navigationGuard';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<RequireAuth><Home /></RequireAuth>}>
          <Route path='filter' element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}
