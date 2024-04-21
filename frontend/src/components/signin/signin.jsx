import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Spinner from 'react-bootstrap/Spinner'

import { useForm } from 'react-hook-form'
import { useState, useContext } from 'react'

import { UserContext } from '../../contexts/user.context'

import axios from 'axios'

const SignIn = ({inline}) => {

    const { setCurrentUser, isLogged, user } = useContext(UserContext)

    const {register, handleSubmit, watch, formState: { errors }} = useForm()
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data) => {
        const logIn = async (data) => {
            await axios.post('http://localhost:5012/u/logIn', {email: data.username, password: data.password})
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                setCurrentUser(res.data)
            })
            .catch((err) => console.log(err))
        }

        setLoading(true)
        await logIn(data)
        setLoading(false)
    }

    return (
        <>
        {loading ?
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner> :
        <Form className="d-flex" onSubmit={handleSubmit(onSubmit)}>
            <Form.Control
            type="text"
            placeholder="Username"
            className="me-2"
            aria-label="Username"
            {...register("username")}
            />
            <Form.Control
            type="password"
            placeholder="Password"
            className="me-2"
            aria-label="Password"
            {...register("password")}
            />
            <ButtonGroup>
                <Button variant="outline-success" type='submit' onSubmit={(e) => e.preventDefault}>Login</Button>
                <Button variant="success">Signup</Button>
            </ButtonGroup>

        </Form>
        }
        </>
    )


}

export default SignIn