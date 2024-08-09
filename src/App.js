import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Add from './components/Add';
import Taskmanager from './components/Taskmanager';
import Impo from './components/Impo';
import Compl from './components/Compl';
import EditTask from './components/EditTask';
// import Imp from './components/Imp';


function App() {
  return (
    <div className="App">
  <Routes>
    <Route path='/'element={<Home></Home>}></Route>
    <Route path='/sidebar' element={<Header></Header>}></Route>
        <Route path='/landing' element={<Landing></Landing>}></Route>
        <Route path='/task' element={<Taskmanager></Taskmanager>}></Route>


    <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
    <Route path='/add' element={<Add></Add>}></Route>
    <Route path='/imp' element={<Impo></Impo>}></Route>
    <Route path='/cmp' element={<Compl></Compl>}></Route>
    <Route path='/edit/:id' element={<EditTask></EditTask>}></Route>





  </Routes>
         <Footer></Footer>

    </div>
  );
}

export default App;
