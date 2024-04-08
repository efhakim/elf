import NavBar from '../../components/navbar/navbar.jsx'
import './page.scss'

const PageLayout = ({children}) => {

    return (
        <div className="page-layout-container">
            <div className="page-layout-navbar">
                <NavBar />
            </div>

            <div className="page-layout-contents">
                {children}
            </div>

            <div>
                
            </div>
        </div>
    )
}

export default PageLayout