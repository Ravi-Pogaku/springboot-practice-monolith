import useAuth from "../hooks/useAuth"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"


function Home() {
    const { auth } = useAuth()

    return <>
    {
        !auth 
        ? <div>Welcome to the Employee Deparment Management Software</div>
        : [
            <Button as={Link} to={'/emps'}>See All Employees</Button>,
            <Button as={Link} to={'/depts'}>See All Departments</Button>
        ]
    }
    </>

}

export default Home