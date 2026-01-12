import { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import useAxios from "../hooks/useAxios"
import { useLocation, useNavigate } from "react-router-dom"

function CreateEmp() {
    const axios = useAxios()
    const navigate = useNavigate()
    const location = useLocation()

    const [empId, setEmpId] = useState(location.state?.emp.id ?? null)
    const [name, setName] = useState(location.state?.emp.name ?? '')
    const [salary, setSalary] = useState(location.state?.emp.salary ?? 0.0)
    const [deptId, setDeptId] = useState(location.state?.emp.deptId ?? 0)

    const [depts, setDepts] = useState([])

    useEffect(() => {
        const fetchDepts = async () => {
            const res = await axios.get("/dept/")

            console.log("FETCHING DEPTS FOR CREATE PAGE")
            console.log(res.data)

            setDepts(res.data)
        }

        try {
            fetchDepts()
        }
        catch (err) {
            console.error("ERROR FETCHING DEPTS FOR CREATE PAGE ", err)
        }
    }, [])

    const createEmployee = (e) => {
        e.preventDefault()
        const sendReq = async () => {
            if (empId === null) {
                const res = await axios.post(
                    '/emp/',
                    JSON.stringify({name, salary, deptId})
                )

                console.log("CREATING EMPLOYEE")
                console.log(res.data)
            }
            else {
                const res = await axios.put(
                    `/emp/${empId}`,
                    JSON.stringify({name, salary, deptId})
                )
                console.log(`UPDATING EMPLOYEE ${empId}`)
                console.log(res.data)
            }

            navigate("/emps")
        }

        sendReq()
    }

    return <Form onSubmit={createEmployee}>
        {empId === null
        ? <h1>Create Employee</h1>
        : <h1>Update Employee</h1>}
        <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control 
                required
                placeholder="Enter a name"
                onChange={(e) => {setName(e.target.value)}}
                value={name}
            />
        </Form.Group>
        <Form.Group>
            <Form.Label>Salary</Form.Label>
            <Form.Control 
                required
                placeholder="Enter a salary"
                type="number"
                onChange={(e) => {setSalary(e.target.value)}}
                value={salary}
            />
        </Form.Group>
        <Form.Group>
            <Form.Label>Department ID</Form.Label>
            <Form.Select
                onChange={(e) => {setDeptId(e.target.value)}}
                value={deptId}
                required
            >
                {
                    depts.map((dept, i) => {
                        return <option key={i} value={dept.id}>{dept.name}</option>
                    })
                }
            </Form.Select>
        </Form.Group>
        <Button type="submit">
            {empId === null 
            ? "Create"
            : "Update"}
        </Button>
    </Form>
}

export default CreateEmp