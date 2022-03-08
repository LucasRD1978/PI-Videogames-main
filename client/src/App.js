import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import {Detail} from './components/Deatil';
import {CreateVg} from './components/CreateVg';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path = '/*' element = {<LandingPage/>} />
      <Route path = '/home' element = {<Home/>}/>
      <Route path='/home/:id' element = {<Detail/>}/>
      <Route path='/videogame' element={<CreateVg/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
