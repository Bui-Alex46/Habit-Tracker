
import './App.css';

import Habit from './pages/habit';
import Authentication from './pages/auth';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className = "App">
      <ul className = "navBar">
    
        <li> <Link to = "/habit"> Habit</Link></li>
        <li> <Link to = "/"> Home</Link></li>
        </ul>

      <Routes>
        <Route exact path = '/habit' element = {<Habit />}></Route>
        <Route exact path = '/' element = {<Authentication />}></Route>
      </Routes>
      </div>
      
    </BrowserRouter>
  );
}

export default App;
