import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import MyNav from './components/MyNav';
import Home from './pages/Home';
import CreateEmp from './pages/CreateEmp';
import CreateDept from './pages/CreateDept';
import Emps from './pages/Emps';
import Depts from './pages/Depts';
import Register from './pages/Register';

function App() {
  return (
  <>
  <MyNav/>
  <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/login' element={<Login />}></Route>
    <Route path='/register' element={<Register />}></Route>
    <Route path='/createEmployee' element={<CreateEmp/>}></Route>
    <Route path='/createDepartment' element={<CreateDept/>}></Route>
    <Route path='/emps' element={<Emps/>}></Route>
    <Route path='/depts' element={<Depts/>}></Route>
  </Routes>
  </>
  )
}

export default App
