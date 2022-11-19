import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './pages/login'
import Register from './pages/register'

import './styles/app.sass'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/registrar' element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
