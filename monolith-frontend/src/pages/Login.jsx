import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setAuth } = useAuth()
  const axios = useAxios()

  const login = async (e) => {
    e.preventDefault()

    console.log(`LOGIN ${username}, ${password}`)
    try {
    const res = await axios.post(
      '/auth/login',
      JSON.stringify({"username":username, "password":password})
    )

    console.log(res.data)
    const username2 = res.data.username

    setAuth({"username": username2})

    setUsername('')
    setPassword('')

    navigate("/")
    } catch (err) {
        console.error(err)
    }

  }

  return (
    <>
      <Form onSubmit={login}>
        <h1>LOGIN</h1>
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
        <Button type='submit'>Login</Button>
      </Form>
    </>
  )
}

export default Login