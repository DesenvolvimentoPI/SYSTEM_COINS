import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/inicio';
import Tipo_login from './pages/tipo_login';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Inicio />} />
        <Route path='/tipo' element={<Tipo_login/>}/>
      </Routes>
    </Router>
  )
}

export default App
