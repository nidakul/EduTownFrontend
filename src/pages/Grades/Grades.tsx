import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import "./grades.css";

type Props = {};

const Grades = (props: Props) => {
  return (
    <Container>
      <Form.Select
        className="grades-select"
        aria-label="Default select example"
      >
        <option>Sınıfı seçiniz</option>
        <option value="1">8. Sınıf</option>
        <option value="2">7. Sınıf</option>
        <option value="3">6. Sınıf</option>
      </Form.Select>

      <Card className="grades-card">
        <Row>
          <Col>
            <Button>1. Dönem Notları</Button>
          </Col>
          <Col>
            <Button>2. Dönem Notları</Button>
          </Col>
        </Row>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="lesson-name">Dersler</th>
              <th colSpan={2}>Yazılı Notları</th>
              <th colSpan={2}>Projeler</th>
              <th colSpan={2}>Sözlü Notları</th>
              <th>Not</th>
            </tr>
            <tr>
              <td></td>
              <th>1. Sınav</th>
              <th>2. Sınav</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>43</td>
            <td>43</td>
            <td>43</td>
            <td>43</td>
            <td>43</td>
            <td>43</td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};
export default Grades;
