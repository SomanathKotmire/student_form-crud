import logo from './logo.svg';
import './App.css';
import Registration from './components/Registration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Userdata from './components/Userdata';

function App() {
  return (
    <div className="App">
      {/* <Registration/> */}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Registration/>}/>
        <Route path='/:id' element={<Registration/>}/>
        <Route path='/userData' element={<Userdata/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
