import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import useAxios from "../hooks/useAxios"
import { useLocation, useNavigate } from "react-router-dom"

function CreateDept() {
    const axios = useAxios()
    const navigate = useNavigate()
    const location = useLocation()
    const [deptId, setDeptId] = useState(location.state?.dept.id ?? null)
    const [name, setName] = useState(location.state?.dept.name ?? '')

    const createDepartment = async (e) => {
        e.preventDefault()
        try {
            if (deptId === null) {
                const res = await axios.post(
                    '/dept/',
                    JSON.stringify({name})
                ) 

                console.log(`CREATING DEPARTMENT ${name}`)
                console.log(res.data)
            }
            else {
                const res = await axios.put(
                    `/dept/${deptId}`,
                    JSON.stringify({name})
                )

                console.log(`UPDATING DEPARTMENT ${deptId}`)
                console.log(res.data)
            }

            navigate("/depts")
        }
        catch (err) {
            console.error("ERROR CREATING DEPARTMENT ", err)
        }
    }

    return <Form onSubmit={createDepartment}>
        {deptId === null 
        ? <h1>Create Department</h1>
        : <h1>Update Department</h1>}
        <Form.Group>
            <Form.Label></Form.Label>
            <Form.Control
                placeholder="Enter a department name"
                onChange={(e) => {setName(e.target.value)}}
                value={name}
            />
        </Form.Group>
        <Button type="submit">
            {deptId === null 
            ? "Create"
            : "Update"}
        </Button>
    </Form>
}

export default CreateDept