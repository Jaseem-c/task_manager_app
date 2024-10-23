import { Route, Routes } from 'react-router-dom'
import  '../src/bootstrap.min.css'
import './App.css'
import Authorization from './Components/Authorization'
import Home from './Components/Home'
import TaskDetails from './Components/TaskDetails'
import Profile from './Components/Profile'
import PageNotFound from './Components/PageNotFound'
import { useContext } from 'react'
import { isLoginAuthContext } from './ContextApi/ContextShare'

function App() {
  
const {isLoginStatus}=useContext(isLoginAuthContext)

  return (
    <>
     <Routes>
      <Route path='/' element={<Authorization/>}></Route>
      <Route path='/login' element={<Authorization login/>}></Route>
      <Route path='/home' element={isLoginStatus?<Home/>:<PageNotFound/>}></Route>
      <Route path='/taskdetails' element={isLoginStatus?<TaskDetails/>:<PageNotFound/>}></Route>
      <Route path='/profile' element={isLoginStatus?<Profile/>:<PageNotFound/>}></Route>
      <Route path='*' element={<PageNotFound/>}></Route>
     </Routes>
    </>
  )
}

export default App
