import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';


import { useEffect, useContext } from 'react'
import { Route, Routes } from "react-router-dom"

import axios from 'axios'

import { UserContext } from './contexts/user.context.jsx'


import Home from './routes/home/home.jsx';
import Page from './layout/page/page.jsx'

function App() {

  const { setCurrentUser, isLogged, clearUser } = useContext(UserContext)

  useEffect(() => {

      if(localStorage.getItem("token")) {
          
          const getUser = async () => {
              await axios.post('http://localhost:5012/u/isLogged', {}, {headers: {'AUTHORIZATION': localStorage.getItem("token")}})
              .then((res) => setCurrentUser(res.data))
              .catch((err) => {
                console.log(err)
                clearUser()
              })
          }
  
          getUser()
      }
  }, 
  [isLogged])

  return (
    <Routes>
      <Route element={<Page/>} path="/">
        <Route element ={<Home />} path="/"></Route>
      </Route>
    </Routes>
  )
}

export default App
