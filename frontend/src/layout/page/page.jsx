import NavBar from '../../components/navbar/navbar.jsx'
import './page.scss'

import { Outlet } from 'react-router-dom'

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