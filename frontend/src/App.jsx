import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';


import { useEffect, useContext } from 'react'
import { Route, Routes } from "react-router-dom"

import axios from 'axios'

import { UserContext } from './contexts/user.context.jsx'


import Page from './layout/page/page.jsx'

import Home from './routes/home/home.jsx';
import Profile from './routes/profile/profile.jsx';

function App() {

  const { setCurrentUser, clearUser } = useContext(UserContext)

  useEffect(() => {

      if(localStorage.getItem("token")) {
          
          const getUser = async () => {
              await axios.post('http://localhost:5012/u/isLogged', {}, {headers: {'AUTHORIZATION': localStorage.getItem("token")}})
              .then((res) => {
                setCurrentUser(res.data)})
              .catch((err) => {
                clearUser()
              })
          }
  
          getUser()
      }
  }, 
  [])

  return (
    <Routes>
      <Route element={<Page/>} path="/">
        <Route element ={<Home />} path="/"></Route>
        <Route element ={<Home />} path="/"></Route>
        <Route element={<Profile />} path="/u/:uid"></Route>
      </Route>
    </Routes>
  )
}

export default App
