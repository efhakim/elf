import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

import axios from 'axios'

const SignIn = ({inline}) => {

    const {register, handleSubmit, watch, formState: { errors }} = useForm()

    const onSubmit = async (data) => {
        const logIn = async (data) => {
            await axios.post('http://localhost:5012/u/logIn', {email: data.username, password: data.password})
            .then((res) => {
                localStorage.setItem("token", res.data.token)
            })
            .catch((err) => console.log(err))
        }

        await logIn(data)
    }

    // useEffect(() => {
    //     const getUser = async () => {
    //         await axios.post('http://localhost:5012/u/isLogged', {}, {headers: {'AUTHORIZATION': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjE1NjVkNzk3NmE4ZDc3YzA3MWFlNmIiLCJpYXQiOjE3MTI2ODQzMTksImV4cCI6MTcxMjc3MDcxOX0.bdCi6sPAxj-ImZC0IVbIMF4pE5zKuO9LYVoI6fd2dgU'}})
    //         .then((res) => console.log(res))
    //         .catch((err) => console.log(err))
    //     }

    //     getUser()

    // }, [])

    switch(inline) {
        case inline:
            return (
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
                        <Button variant="outline-success" type='submit'>Login</Button>
                        <Button variant="success">Signup</Button>
                    </ButtonGroup>
                </Form>
            )
        default:
            console.log("inline")
    }

}

export default SignIn