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
import { GetLessonsBySchoolIdAndClassIdResponse } from "../../models/responses/getLessonsBySchoolIdAndClassIdResponse";
import termService from "../../services/termService";
import { GetTermsResponse } from "../../models/responses/getTermsResponse";

type Props = {};

const Grades = (props: Props) => {
  const userId = getUserId();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  console.log("user", user);
  const [gradeType, setGradeType] = useState<GetListGradeTypeResponse[]>([]);
  console.log("gradeType ", gradeType);
  const [schoolId, setSchoolId] = useState<number>();
  const [classId, setClassId] = useState<number>();
  const [classes, setClasses] = useState<GetClassesBySchoolId | null>(null);
  const [lessons, setLessons] = useState<GetLessonsBySchoolIdAndClassIdResponse>();
  const [terms, setTerms] = useState<GetTermsResponse[]>([]);

  const fetchGradeType = async () => {
    try {
      const response = await gradeTypeService.getList();
      setGradeType(response.data.items);
    } catch (error) {
      console.error("Failed to fetch gradeTypes:", error);
    }
  };

  console.log("schoolId", schoolId);
  console.log("classroomId", classId);

  const fetchClasses = async (schoolId: number) => {
    try {
      const classes = await schoolService.getClassesBySchoolId(schoolId);
      setClasses(classes.data);
    } catch (error) {
      console.error("Failed to fetch classes:", error);

    }
  }

  const fetchTerms = async () => {
    try {
      const terms = await termService.getList();
      setTerms(terms.data.items);
    } catch (error) {
      console.error("Failed to fetch terms:", error);
    }
  }

  const fetchLessons = async (schoolId: number, classroomId: number) => {
    try {
      const lessons = await lessonService.getLessonsBySchoolIdAndClassId(schoolId, classroomId);
      setLessons(lessons.data);
      console.log("lessons", lessons.data);
    } catch (error) {
      console.error("Failed to fetch lessons:", error);
    }
  }


  const fetchStudentGrade = async () => {
    try {
      if (userId) {
        const response = await userService.getStudentDetailById(userId);
        const grades = await userService.getStudentGrades(userId);
        const userData = {
          ...response.data,
          grade: grades.data,
        };
        // console.log("grade", userData.grade); 
        dispatch(setUser(userData));
        setSchoolId(userData.schoolId);
        setClassId(userData.classroomId);
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
    fetchTerms();
  }, [dispatch, userId]);

  useEffect(() => {
    if (schoolId) {
      fetchClasses(schoolId);
    }
  }, [schoolId]);

  useEffect(() => {
    if (schoolId && classId)
      fetchLessons(schoolId, classId);

  }, [classId]);


  return (
    <Container>
      <Form.Select
        className="grades-select"
        aria-label="Select className"
      // onChange={(e) => setClassId(Number(e.target.value))}
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
          {terms.map((term, index) => (
            <Col key={index}>
              <Button>{term.name}. Dönem</Button>
            </Col>
          ))}
        </Row>

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
          </thead>
          <tbody>
            {lessons && lessons.lessonName && lessons.lessonName.map((lessonName: string, index: number) => (
              <tr key={index}>
                <td>{lessonName}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};
export default Grades;


