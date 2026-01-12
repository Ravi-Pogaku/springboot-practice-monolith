import { Button } from "react-bootstrap"

function EmpListItem({emp, i, onUpdate, onDelete}) {
    return <div className="list"> 
            <div className="item" key={i}>{emp.id}. {emp.name}, {emp.salary}</div>
            <Button className="item" onClick={() => onUpdate(emp)}>Update</Button>
            <Button className="item" onClick={() => onDelete(emp.id)}>Delete</Button>
        </div>
}

export default EmpListItem