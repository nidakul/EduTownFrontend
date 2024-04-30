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
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../services/identityService";
import userService from "../../services/userService";
import { setUser } from "../../store/user/userSlice";
import { useEffect } from "react";

type Props = {};

const Grades = (props: Props) => {
  const userId = getUserId();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);

  const fetchStudentGrade = async () => {
    try {
      if (userId) {
        const response = await userService.getUserDetailById(userId);
        const grades = await userService.getStudentGrades(userId);
        const userData = {
          ...response.data,
          grade: grades.data,
        };
        dispatch(setUser(userData));
        console.log("userData", userData);
      }
    } catch (error) {
      console.error("Veri alınamadı:", error);
    }
  };

  useEffect(() => {
    fetchStudentGrade();
  },[dispatch, userId]);

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

            {user && user.grade.studentGrades && user.grade.studentGrades.length>0 && (
        <Table striped bordered hover>
          <thead className="grades">
              <tr>
              <th className="lesson-name">Dersler</th>
              <th colSpan={2}>Yazılı Notları</th>
              <th colSpan={2}>Projeler</th>
              <th colSpan={2}>Sözlü Notları</th>
              <th>Not</th>

            </tr>
                <tr>
              <td></td>
              <th>1</th>
              <th>2</th>
              <th>1</th>
              <th>2</th>
              <th>1</th>
              <th>2</th>
            </tr>
          </thead>
          <tbody>
              {user.grade.studentGrades.map((studentGrade: any) => (
                <tr>
              <td>{studentGrade.lessonName}</td>
              <td>Smith</td>
              <td>43</td>
              <td>43</td>
              <td>43</td>
              <td>43</td>
              <td>43</td>
              <td>43</td>
            </tr>
            ))}
          </tbody>

        </Table>
          )}
      </Card>
    </Container>
  );
};
export default Grades;
