import { Container } from "react-bootstrap";
import DisplayList from "./utils/displaylist";
import FormTodo from "./utils/form";

function App() {
  return (
    <>
      <Container style={{ marginTop: '10px' }}>
        <FormTodo />
      </Container>
      <Container style={{ marginTop: '20px' }}>
        <DisplayList />
      </Container>
    </>
  );
}

export default App;