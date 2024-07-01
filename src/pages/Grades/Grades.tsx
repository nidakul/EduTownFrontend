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
import lessonService from "../../services/lessonService";
import { GetLessonsBySchoolIdAndClassIdResponse } from "../../models/responses/getLessonsBySchoolIdAndClassIdResponse";
import termService from "../../services/termService";
import { GetTermsResponse } from "../../models/responses/getTermsResponse";
import { GetListClassesResponse } from "../../models/responses/getListClassesResponse";
import classService from "../../services/classService";
import { StudentGradesResponse } from "../../models/responses/studentGradesResponse";

type Props = {};

const Grades = (props: Props) => {
  const userId = getUserId();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  console.log("user", user);
  const [gradeType, setGradeType] = useState<GetListGradeTypeResponse[]>([]);
  const [schoolId, setSchoolId] = useState<number>();
  const [classId, setClassId] = useState<number>(); //user's classroomId
  const [selectedClassId, setSelectedClassId] = useState<number | undefined>();
  const [classes, setClasses] = useState<GetListClassesResponse[]>([]);
  const [lessons, setLessons] = useState<GetLessonsBySchoolIdAndClassIdResponse>();
  const [terms, setTerms] = useState<GetTermsResponse[]>([]);
  const [grades, setGrades] = useState<StudentGradesResponse[]>([]);
  const [selectedTermId, setSelectedTermId] = useState<number>();

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

  const fetchClasses = async () => {
    try {
      if (classId !== undefined) {
        const response = await classService.getList();
        const classesArray = response.data.items.filter(classItem => classItem.id <= classId);
        setClasses(classesArray);
      }
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

  const fetchStudentGrades = async () => {
    try {
      if (userId) {
        const response = await userService.getStudentDetailById(userId);
        const grades = await userService.getStudentGrades(userId);
        const userData = {
          ...response.data,
          grade: grades.data.studentGrades,
        };
        dispatch(setUser(userData));
        console.log("gradessss", userData.grade);
        setSchoolId(userData.schoolId);
        setClassId(userData.classroomId);
        setGrades(userData.grade);
        setSelectedClassId(userData.classroomId); // set initial selectedclass
      }
    } catch (error) {
      console.error("Failed to fetch userGrades", error);
    }
  };

  const handleTermClick = (termId: number) => {
    console.log(termId, "tıklandı");
    setSelectedTermId(termId);
  }


  useEffect(() => {
    fetchStudentGrades();
    fetchGradeType();
    fetchTerms();
  }, [dispatch, userId]);

  useEffect(() => {
    if (schoolId && selectedClassId)
      fetchLessons(schoolId, selectedClassId);

  }, [selectedClassId]);

  useEffect(() => {
    if (classId !== undefined) {
      fetchClasses();
    }
  }, [classId]);

  return (
    <Container>
      <label htmlFor="grades-select">Öğrencinin Sınıfları:</label>
      <Form.Select
        id="grades-select"
        className="grades-select"
        aria-label="Select className"
        value={selectedClassId}
        onChange={(e) => setSelectedClassId(Number(e.target.value))}
      >
        {classes && classes.map((classItem: any, index: number) => (
          <option key={index} value={classItem.id}>
            {classItem.name}. Sınıf
          </option>
        ))}
      </Form.Select>

      <div className="terms">
        {terms.map((term) => (
          <Button key={term.id} onClick={() => handleTermClick(term.id)}>{term.name}. Dönem</Button>
        ))}
      </div>

      <Card className="grades-card">
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
              {/* number of colspan */}
              {gradeType.map((type, typeIndex) => (
                type.gradeCount > 0 ?
                  Array.from({ length: type.gradeCount }).map((_, countIndex) => (
                    <th key={`${typeIndex}-${countIndex}`}>
                      {countIndex + 1}
                    </th>
                  ))
                  : (<th key={`${typeIndex}-empty`}></th>
                  )
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
    </Container >
  );
};
export default Grades;


