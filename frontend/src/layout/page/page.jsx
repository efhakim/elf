import NavBar from '../../components/navbar/navbar.jsx'
import './page.scss'

import { useEffect, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'

import { UserContext } from '../../contexts/user.context.jsx'

const PageLayout = ({children}) => {

    return (
        <div className="page-layout-container">
            <div className="page-layout-navbar">
                <NavBar />
            </div>

            <div className="page-layout-contents">
                <Outlet />
            </div>

            <div>
                
            </div>
        </div>
    )
}

export default PageLayout