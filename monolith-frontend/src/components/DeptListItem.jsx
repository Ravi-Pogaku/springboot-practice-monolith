import { Button } from "react-bootstrap"

function DeptListItem({dept, i, onUpdate, onDelete}) {
    return <div className="list">
            <div key={i} className="item">{dept.id}. {dept.name}</div>
            <Button className="item" onClick={() => onUpdate(dept)}>Update</Button>
            <Button className="item" onClick={() => onDelete(dept.id)}>Delete</Button>
        </div>
}

export default DeptListItem