import './App.css'
import Home from './component/ home/Home'
import { Provider } from './components/ui/provider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import VerifyLogin from './pages/verifyLogin/VerifyLogin'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './component/PrivateRoute'
import { ToastContainer } from 'react-toastify'
function App() {
  return (
    <AuthProvider>
      <Provider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path='/:projectId'
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/verify' element={<VerifyLogin />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  )
}

export default App
