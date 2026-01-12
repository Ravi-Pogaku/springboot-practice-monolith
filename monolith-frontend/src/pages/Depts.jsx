import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import useAxios from "../hooks/useAxios"
import DeptListItem from "../components/DeptListItem"

function Depts() {
    const navigate = useNavigate()
    const axios = useAxios()
    const [depts, setDepts] = useState([])

    useEffect(() => {
        const getDepts = async () => {
            const res = await axios.get(
                '/dept/'
            )

            console.log("DEPTS: ", res.data)
            setDepts(res.data)
        }
        
        getDepts()
    }, [])

    const deleteDept = async (deptId) => {
        try {
            await axios.delete(`/dept/${deptId}`)

            setDepts(prev => prev.filter(dept => dept.id !== deptId))
        }
        catch (err) {
            console.error("ERROR DELETING DEPARTMENT ", err)
        }
    }

    const updateDept = async (dept) => {
        try {
            navigate("/createDepartment", {state: {dept: dept}})
        }
        catch (err) {
            console.error("ERROR UPDATING DEPT ", err)
        }
    }

    return <div>
    {
        depts.map((dept, i) => {
            return <DeptListItem dept={dept} i={i} onUpdate={updateDept} onDelete={deleteDept}/>
        })
    }
    </div>
    
}

export default Depts