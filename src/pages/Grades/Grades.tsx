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
import { useEffect, useState } from "react";
import React from "react";
import gradeTypeService from "../../services/gradeTypeService";
import { GetListGradeTypeResponse } from "../../models/responses/getListGradeTypeResponse";

type Props = {};

const Grades = (props: Props) => {
  const userId = getUserId();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const [gradeType, setGradeType] = useState<GetListGradeTypeResponse[]>([]);
  console.log("gradeType ", gradeType);
  const fetchGradeType = async () => {
    try {
      const response = await gradeTypeService.getList();
      setGradeType(response.data.items);
    } catch (error) {
      console.error("GradeType verisi alınamadı:", error);
    }
  };

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
    fetchGradeType();
  }, [dispatch, userId]);

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

        {user &&
          user.grade.studentGrades &&
          user.grade.studentGrades.length > 0 && (
            <Table striped bordered hover>
              <thead className="grades">
                <tr>
                  {gradeType.map((type, typeIndex) => (
                    //ayrı bir component ile yönet burayı!!! colspan'i veritabanından çek
                    <th
                      key={typeIndex}
                      colSpan={type.gradeCount}
                      className={typeIndex === 0 ? "lesson-name" : ""}
                    >
                      {type.name}
                    </th>
                  ))}
                </tr>
                <tr>
                  <td></td>
                  {gradeType.map((type, typeIndex) => (
                    <React.Fragment key={typeIndex}>
                      {/* create array for gradeCount*/}
                      {Array.from(Array(type.gradeCount).keys()).map(
                        (index) => (
                          <th key={index}>{index + 1}</th>
                        )
                      )}
                    </React.Fragment>
                  ))}
                </tr>
              </thead>

              {user &&
                user.grade.studentGrades &&
                user.grade.studentGrades.length > 0 && (
                  <tbody>
                    {user.grade.studentGrades.map((studentGrade: any) => (
                      <tr key={studentGrade.lessonName}>
                        <td>{studentGrade.lessonName}</td>
                        {studentGrade.grades.map(
                          (grade: any, index: number) => (
                            <React.Fragment key={index}>
                              {grade.gradesDto.map(
                                (gradeDto: any, gradeIndex: number) => (
                                  <>
                                    {/* <td key={1}>{gradeDto.grade}</td> */}
                                    <td key={gradeIndex}>{gradeDto.grade}</td>
                                  </>
                                )
                              )}
                            </React.Fragment>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                )}
            </Table>
          )}
      </Card>
    </Container>
  );
};
export default Grades;
