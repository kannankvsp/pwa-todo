import { Button, ListGroup } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { completeTodo, removeTodo, selectTask } from "../redux/taskreducers"
import { FcHighPriority, FcLowPriority, FcMediumPriority } from 'react-icons/fc'
import { MdDeleteOutline } from 'react-icons/md'
import {TiTick} from 'react-icons/ti'
import {GrUnlock} from 'react-icons/gr'
export default function DisplayList() {
    const dispatch = useDispatch();
    const task = useSelector(selectTask)
    return (
        <>
            <ListGroup variant='flush' as='ol' numbered>
                {task.map((item, idx) => {
                    return (
                        <ListGroup.Item variant={item.completed?"success":""} as='li' key={idx} className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{item.taskname}</div>
                                {item.description}
                            </div>
                            {item.priority === 'high' ? <FcHighPriority size='1.5em' style={{ marginRight: '10px' }} /> : item.priority === 'medium' ? <FcMediumPriority size='1.5em' style={{ marginRight: '10px' }} /> : <FcLowPriority size='1.5em' style={{ marginRight: '10px' }} />}
                            <Button variant='success' style={{marginRight:'10px'}} onClick={() => dispatch(completeTodo(item.taskname))}>{(!item.completed)?<TiTick />:<GrUnlock/>}</Button>
                            
                            <Button variant='danger' onClick={() => dispatch(removeTodo(item.taskname))}><MdDeleteOutline/></Button>
                            
                        </ListGroup.Item>)
                })}
            </ListGroup>
        </>
    )
}