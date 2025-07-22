import './App.css'
import Home from './component/ home/Home'
import { Provider } from './components/ui/provider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import VerifyLogin from './pages/verifyLogin/VerifyLogin'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './component/PrivateRoute'
function App() {
  return (
    <AuthProvider>
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
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
