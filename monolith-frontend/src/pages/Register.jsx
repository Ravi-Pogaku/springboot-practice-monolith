import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const axios = useAxios()

  const register = async (e) => {
    e.preventDefault()

    try {
        const res = await axios.post(
            '/auth/register',
            JSON.stringify({username, password})
        )

        console.log("REGISTERING USER ", username, password)
        console.log(res.data)

        navigate('/login')
    }
    catch (err) {
        console.error("ERROR DURING REGISTRATION ", err)
    }
  }

  return (
    <>
      <Form onSubmit={register}>
        <h1>REGISTER</h1>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder='Enter username' 
            onChange={(e) => setUsername(e.target.value)} 
            value={username}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type='password' 
            placeholder='Enter password' 
            onChange={(e) => setPassword(e.target.value)} 
            value={password}
          />
        </Form.Group>
        <Button type='submit'>Register</Button>
      </Form>
    </>
  )
}

export default Register