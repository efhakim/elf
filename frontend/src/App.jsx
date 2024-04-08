import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';



import { Route, Routes } from "react-router-dom"

import Home from './routes/home/home.jsx';

function App() {

  return (
    <Routes>
      <Route element={<Home/>} path="/" />
    </Routes>
  )
}

export default App
