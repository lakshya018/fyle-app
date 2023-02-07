import './App.css';
import Home from './components/Home/Home';
import Subjects from './components/Subjects/Subjects';
import { Routes, Route, Link } from 'react-router-dom';
import Subject from './components/Subject/Subject';

function App() {
  return (
    <div className="App">
      
      <Link to={"/"} className="go-to-home"><button>Go to Home</button></Link>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/subjects/:subjectName' element={<Subject/>}/>
      </Routes>
    </div>
  );
}

export default App;
