import { Navbar, Nav, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useLogout from "../hooks/useLogout";

function MyNav() {
    const { auth } = useAuth();
    const { logout } = useLogout();

    return <Navbar style={{backgroundColor: '#000000'}}>
        <Container>
        <Navbar.Brand as={Link} to='/'>
            Home
        </Navbar.Brand>
        <Nav>
        {
        !auth   
        ? [<Nav.Link as={Link} to={'/login'}>Login</Nav.Link>,
            <Nav.Link as={Link} to={'/register'}>Register</Nav.Link>
        ]
        : [<Nav.Link as={Link} to={'/createEmployee'}>Create Employee</Nav.Link>,
            <Nav.Link as={Link} to={'/createDepartment'}>Create Department</Nav.Link>,
        <Nav.Link as={Link} to='/' onClick={logout}>Logout</Nav.Link>]
        }
        </Nav>
        </Container>
    </Navbar>
}

export default MyNav