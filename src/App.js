import logo from './logo.svg';
import './App.css';
import GreetingPage from './components/GreetingPage';
import { Routes,Route } from 'react-router-dom';
import Survey from './components/Survey';
import Thank from './components/Thank';

function App() {
  return (
    <div className="App">
      <Routes>
       <Route path='/' element={ <GreetingPage/>}/>
       <Route path='/survey' element={<Survey/>} />
       <Route path='/thankpage' element={<Thank/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
