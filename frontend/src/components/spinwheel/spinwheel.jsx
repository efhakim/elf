import Spinner from "react-bootstrap/Spinner";

const SpinWheel = () => {
    return(
        <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
        </Spinner> 
    )
}

export default SpinWheel