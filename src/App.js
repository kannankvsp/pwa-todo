import { useState } from "react";
import { Button, Container, FloatingLabel, Form, Toast } from "react-bootstrap";
import { BsPlusLg } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import { addTodo, selectTask } from "./redux/taskreducers";
import DisplayList from "./utils/displaylist";
import { AiFillWarning } from 'react-icons/ai';

function App() {
  const [toastshow, setToastshow] = useState(false)
  const [toastduplicate, setToastduplicate] = useState(false)
  var task = useSelector(selectTask)
  const ValidateAndAdd = () => {
    if (taskinp.taskname !== '' && taskinp.description !== '') {
      var arr = task.map((item) => item.taskname)
      if (arr.includes(taskinp.taskname)) setToastduplicate(true)
      else dispatch(addTodo({ ...taskinp, "completed": false }))
    }
    else {
      setToastshow(true)
    }
  }
  const dispatch = useDispatch()
  const [taskinp, setTaskinp] = useState({
    taskname: '',
    completed: false,
    description: '',
    priority: 'high'
  })
  return (
    <>
      <Container style={{ marginTop: '10px' }}>
        <Form.Floating
          className="mb-3"
          label="Task name"
          controlid="floatingInput">
          <Form.Control
            type="text"
            onChange={(e) => setTaskinp({ ...taskinp, 'taskname': e.target.value })}
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
            onChange={(e) => setTaskinp({ ...taskinp, 'description': e.target.value })}
          />
        </FloatingLabel>
        <FloatingLabel
          className="mb-3"
          label="Choose priority" >
          <Form.Select aria-label='priority'
            onChange={(e) => setTaskinp({ ...taskinp, 'priority': e.target.value })}>
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
      </Container>

      <Container style={{ marginTop: '20px' }}>
        <DisplayList />
      </Container>
    </>
  );
}

export default App;