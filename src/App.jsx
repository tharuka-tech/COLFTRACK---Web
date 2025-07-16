import './App.css'


import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import Home from './pages/Home'
import { Scroll } from 'lucide-react'
import { AddLoan } from './pages/Admin/AddLoan'
import Register from './pages/Admin/AddEmployee'
import ManageEmployee from './pages/Admin/ManageEmployee'
import AreaScreen from './pages/Admin/Area'
import ProtectedRoute from './pages/ProtectRoute'
import ManageLoanScreen from './pages/Admin/ManageLoan'
import PenaltyScreen from './pages/Admin/Penalty'
import ManageCustomer from './pages/Admin/ApproveCus'


function App() { 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          
          
          <Route path='/home/login' element={<Login/>}></Route>
          
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
          <Route path='/dashboard/addLoan' element={<ProtectedRoute><AddLoan/></ProtectedRoute>}></Route>
           <Route path='/dashboard/addEmployee' element={<ProtectedRoute><Register/></ProtectedRoute>}></Route>
           <Route path = '/dashboard/manageEmployee' element={<ProtectedRoute><ManageEmployee/></ProtectedRoute>}></Route>
           <Route path = '/dashboard/area' element={<ProtectedRoute><AreaScreen/></ProtectedRoute>}></Route>
           <Route path = '/dashboard/manageLoan' element={<ProtectedRoute><ManageLoanScreen/></ProtectedRoute>}></Route>
           <Route path = '/dashboard/penalty' element={<ProtectedRoute><PenaltyScreen/></ProtectedRoute>}></Route>
            <Route path = '/dashboard/approveCustomer' element={<ProtectedRoute><ManageCustomer/></ProtectedRoute>}></Route>
        </Routes>
      </BrowserRouter>
        
    </>
  )
}

export default App
