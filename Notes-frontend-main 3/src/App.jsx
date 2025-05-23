import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Notes from './pages/Notes'
import { AuthProvider } from './context/AuthPrivider'
import NavPage from './pages/NavPage'
import Test from './component/Test'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

function App() {
  

  return (
   <>
   <NavPage/>
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/forgot-password' element={<ForgotPassword />} />
    <Route path='/reset-password/:token' element={<ResetPassword/>} />
    <Route path='/notes' element={ <AuthProvider> <Notes/></AuthProvider>} />
    <Route path='/test' element={<Test />} />
   </Routes>

   </>
  )
}

export default App
