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
import schoolService from "../../services/schoolService";
import { GetClassesBySchoolId } from "../../models/responses/getClassesBySchoolId";
import lessonService from "../../services/lessonService";

type Props = {};

const Grades = (props: Props) => {
  const userId = getUserId();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  console.log("user", user);
  const [gradeType, setGradeType] = useState<GetListGradeTypeResponse[]>([]);
  console.log("gradeType ", gradeType);
  const [schoolId, setSchoolId] = useState<number>();
  const [classes, setClasses] = useState<GetClassesBySchoolId | null>(null);

  const fetchGradeType = async () => {
    try {
      const response = await gradeTypeService.getList();
      setGradeType(response.data.items);
    } catch (error) {
      console.error("Failed to fetch gradeTypes:", error);
    }
  };

  console.log("schoolId", schoolId);

  const fetchClasses = async (schoolId: number) => {
    try {
      const classes = await schoolService.getClassesBySchoolId(schoolId);
      setClasses(classes.data);
    } catch (error) {
      console.error("Failed to fetch classes:", error);

    }
  }

 


  const fetchStudentGrade = async () => {
    try {
      if (userId) {
        const response = await userService.getUserDetailById(userId);
        // const grades = await userService.getStudentGrades(userId);
        const userData = {
          ...response.data,
          // grade: grades.data,
        };
        // console.log("grade", userData.grade);
        dispatch(setUser(userData));
        setSchoolId(userData.schoolId);
        // if (userData.schoolId) {
        //   fetchClasses(userData.schoolId);
        // }
      }
    } catch (error) {
      console.error("Failed to fetch userGrades", error);
    }
  };

  function createArrayForGradeCount(gradeCount: number): number[] {
    const gradeCountArray = Array.from(Array(gradeCount).keys()).map(
      (index) => index + 1
    );
    console.log("gradeCountArray", gradeCountArray);
    return gradeCountArray;
  }


  useEffect(() => {
    fetchStudentGrade();
    fetchGradeType();
  }, [dispatch, userId]);

  useEffect(() => {
    if (schoolId) {
      fetchClasses(schoolId);
    }
  }, [schoolId]);

  return (
    <Container>
      <Form.Select
        className="grades-select"
        aria-label="Default select example"
      >
        <option>Sınıfı seçiniz</option>
        {classes && classes.classroomName.map((className, index) => (
          <option key={index} value={className}>
            {className}
          </option>
        ))}
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
          user.grade &&
          user.grade.studentGrades &&
          user.grade.studentGrades.length > 0 && (
            <Table striped bordered hover>
              <thead className="grades">
                <tr>
                  {gradeType.map((type, typeIndex) => (
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
                      {createArrayForGradeCount(type.gradeCount).map(
                        (number, index) => (
                          <th key={index}>{index + 1}</th>
                        )
                      )}
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {user.grade.studentGrades.map((studentGrade: any) => (
                  <tr key={studentGrade.lessonName}>
                    <td>{studentGrade.lessonName}</td>
                    {gradeType.map((type) => {
                      const matchingGrade = studentGrade.grades.find(
                        (grade: any) => grade.gradeTypeName === type.name
                      );
                      if (matchingGrade) {
                        return Array.from(Array(type.gradeCount).keys()).map(
                          (index) => {
                            const matchingGradeDto =
                              matchingGrade.gradesDto.find(
                                (gradeDto: any) =>
                                  gradeDto.examCount - 1 === index
                              );
                            return (
                              <td key={index}>
                                {matchingGradeDto ? matchingGradeDto.grade : ""}
                              </td>
                            );
                          }
                        );
                      } else {
                        return Array.from(Array(type.gradeCount).keys()).map(
                          (index) => <td key={index}></td>
                        );
                      }
                    })}
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


