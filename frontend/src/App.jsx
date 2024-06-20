import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

function App() {
  return (
    
    <>
      <div className='bg-gradient1 min-h-[100vh]'>
        <Routes>
            <Route path='/' element={<ProtectedRoutes><HomePage/></ProtectedRoutes>}  />
            <Route path='/login' element={<Login/>}  />
            <Route path='/register' element={<Register/>}  />
        </Routes>
      </div>
    </>
  )
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}


export default App
