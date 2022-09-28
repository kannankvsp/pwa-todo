import { AiFillWarning } from 'react-icons/ai';
import { useRef, useState } from "react";
import { Button, FloatingLabel, Form, Toast } from "react-bootstrap";
import { BsPlusLg } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import { addTodo, selectTask } from "../redux/taskreducers";

export default function FormTodo() {
    const [toastshow, setToastshow] = useState(false)
    const [toastduplicate, setToastduplicate] = useState(false)
    const taskname = useRef()
    const description = useRef()
    const priority = useRef()
    var task = useSelector(selectTask)
    const ValidateAndAdd = () => {
        if (taskname.current.value !== '' && description.current.value !== '') {
            var arr = task.map((item) => item.taskname)
            if (arr.includes(taskname.current.value)) setToastduplicate(true)
            else dispatch(addTodo({ "taskname": taskname.current.value, "description": description.current.value, "priority": priority.current.value, "completed": false }))
        }
        else {
            setToastshow(true)
        }
    }
    const dispatch = useDispatch()
    return (
        <>
            <Form.Floating
                className="mb-3"
                label="Task name"
                controlid="floatingInput">
                <Form.Control
                    type="text"
                    ref={taskname}
                    placeholder="Task name"
                    id="floatingInputCustom" />
                <label htmlFor="floatingInputCustom">Task name</label>
            </Form.Floating>
            <FloatingLabel
                label="Description"
                controlId="floatingInput"
                className="mb-3">
                <Form.Control as="textarea"
                    placeholder="Description"
                    ref={description}
                />
            </FloatingLabel>
            <FloatingLabel
                className="mb-3"
                label="Choose priority" >
                <Form.Select aria-label='priority'
                    defaultValue="high"
                    ref={priority}
                >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </Form.Select>
            </FloatingLabel>
            <center>
                <Toast bg="warning" show={toastshow} onClose={() => setToastshow(false)} delay={3000} autohide>
                    <Toast.Header>
                        <AiFillWarning />
                        <strong className='me-auto'>Input Err...</strong>
                    </Toast.Header>
                    <Toast.Body>Enter task name and description</Toast.Body>
                </Toast>
                <Toast bg="warning" show={toastduplicate} onClose={() => setToastduplicate(false)} delay={3000} autohide>
                    <Toast.Header>
                        <AiFillWarning />
                        <strong className='me-auto'>Duplicate Task</strong>
                    </Toast.Header>
                    <Toast.Body>Task already present</Toast.Body>
                </Toast>
            </center>
            <div className="d-grid gap-2">
                <Button size="lg" onClick={() => ValidateAndAdd()}>Add <BsPlusLg /></Button>
            </div>
        </>
    )
}