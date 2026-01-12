import { Form, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import useAxios from "../hooks/useAxios"

function EmpSearchFilter({onSearch}) {
    const axios = useAxios()

    const [depts, setDepts] = useState([])
    const [deptId, setDeptId] = useState(null)
    
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

    return <Form className="d-flex" onSubmit={(e) => {onSearch(e, deptId)}}>
        <Form.Select
            onChange={(e) => {setDeptId(e.target.value)}}
            value={deptId}
            required
        >
            <option value={-1}>Search by department</option>
            {
                depts.map((dept, i) => {
                    return <option key={i} value={dept.id}>{dept.name}</option>
                })
            }
        </Form.Select>
        <Button type="submit">Search</Button>
    </Form>

}

export default EmpSearchFilter