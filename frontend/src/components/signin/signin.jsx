import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const SignIn = ({inline}) => {

    switch(inline) {
        case inline:
            return (
                <Form className="d-flex">
                    <Form.Control
                    type="text"
                    placeholder="Username"
                    className="me-2"
                    aria-label="Username"
                    />
                    <Form.Control
                    type="password"
                    placeholder="Password"
                    className="me-2"
                    aria-label="Password"
                    />
                    <ButtonGroup>
                        <Button variant="outline-success">Login</Button>
                        <Button variant="success">Signup</Button>
                    </ButtonGroup>
                </Form>
            )
        default:
            console.log("inline")
    }

}

export default SignIn