import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "../api/axios"
import EmpListItem from "../components/EmpListItem"
import EmpSearchFilter from "../components/EmpSearchFilter"

function Emps() {
    const navigate = useNavigate()
    const [emps, setEmps] = useState([])

    useEffect(() => {
        const getEmps = async () => {
            const res = await axios.get(
                '/emp/'
            )

            console.log("EMPS: ", res.data)
            setEmps(res.data)
        }
        
        getEmps()
    }, [])

    const deleteEmp = async (empId) => {
        try {
            await axios.delete(`/emp/${empId}`)

            setEmps(prev => prev.filter(emp => emp.id !== empId))
        }
        catch (err) {
            console.error("ERROR DELETING EMPLOYEE ", err)
        }
    }

    const updateEmp = async (emp) => {
        try {
            navigate("/createEmployee", {state: {emp: emp}})
        }
        catch (err) {
            console.error("ERROR UPDATING EMPLOYEE ", err)
        }
    }

    const searchEmp = async (e, deptId) => {
        e.preventDefault()
        try {
            if (deptId > 0) {
                const res = await axios.get(`/dept/${deptId}`)
                console.log("SEARCHING FOR EMPS IN DEPT ", deptId)
                console.log(res.data)

                setEmps(res.data.employees)
            }
            else {
                const res = await axios.get('/emp/')
                console.log("GETTING ALL EMPLOYEES")
                console.log(res.data)

                setEmps(res.data)
            }
        }
        catch (err) {
            console.error("ERROR SEARCHING EMPLOYEE BY DEPT ID ", err)
        }
    }

    return <div>
        <EmpSearchFilter onSearch={searchEmp} />
    {
        emps.map((emp, i) => {
            return <EmpListItem emp={emp} i={i} onUpdate={updateEmp} onDelete={deleteEmp}/>
        })
    }
    </div>
}

export default Emps