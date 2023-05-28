
import './App.css';
import Home from './pages/home';
import Habit from './pages/habit';
import Authentication from './pages/auth';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className = "App">
      <ul>
        <li><Link to = "/home"> Home</Link></li>
        <li> <Link to = "/habit"> Habit</Link></li>
        <li> <Link to = "/"> Authentication</Link></li>
        </ul>

      <Routes>
        <Route exact path = '/home' element = {<Home />}></Route>
        <Route exact path = '/habit' element = {<Habit />}></Route>
        <Route exact path = '/' element = {<Authentication />}></Route>
      </Routes>
      </div>
      
    </BrowserRouter>
  );
}

export default App;
