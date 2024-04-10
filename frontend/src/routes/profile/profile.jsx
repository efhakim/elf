import { useContext } from "react"
import { useParams } from "react-router"

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import { UserContext } from "../../contexts/user.context"

import SpinWheel from "../../components/spinwheel/spinwheel"

const Profile = () => {
    const {isLogged, user} = useContext(UserContext)

    const {uid} = useParams()


    const ProfileForm = ({user}) => {
        return (
            <Form>
                <Form.Group className="mb-3" >

                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder={user.name} disabled readOnly />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder={user.email} disabled readOnly />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder={user.password} disabled readOnly />
                    </Form.Group>
            </Form>
        )
    }


    if(user) {
        if(user.uuid != uid) {
            return (
                <p>You do not have access to this user.</p>
            )
        } else {
            return (
                <ProfileForm user={user} />
            )
        }
    } 
    else {
        return <SpinWheel />
    }

}

export default Profile