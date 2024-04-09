import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';



import { Route, Routes } from "react-router-dom"

import Home from './routes/home/home.jsx';
import Page from './layout/page/page.jsx'

function App() {

  return (
    <Routes>
      <Route element={<Page/>} path="/">
        <Route element ={<Home />} path="/"></Route>
      </Route>
    </Routes>
  )
}

export default App
