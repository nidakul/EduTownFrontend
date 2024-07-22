import {
  Button,
  Card,
  Container,
  Form,
  Table,
} from "react-bootstrap";
import "./grades.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../services/identityService";
import { useEffect, useState } from "react";
import termService from "../../services/termService";
import { GetTermsResponse } from "../../models/responses/getTermsResponse";
import { StudentGradesResponse } from "../../models/responses/studentGradesResponse";
import { AppDispatch, RootState } from "../../store/configureStore";
import { getLessonsBySchoolIdAndClassId } from "../../store/lesson/lessonSlice";
import { getAllClasses } from "../../store/class/classSlice";
import { ClassInformationResponse } from "../../models/responses/classInformationResponse";
import { getAllStudents, getStudentGrades } from "../../store/student/studentSlice";
import { getGradeTypes } from "../../store/gradeType/gradeTypeSlice";
import { getUserDetailById } from "../../store/user/userSlice";


type Props = {};

const Grades = (props: Props) => {
  const userId = getUserId();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.items);
  const lesson = useSelector((state: RootState) => state.lesson.lesson);
  const classes = useSelector((state: RootState) => state.classes.items);
  const gradeType = useSelector((state: RootState) => state.gradeType.gradeType?.items);
  const studentGrade = useSelector((state: RootState) => state.student.studentGrades);

  console.log("studentGrade", studentGrade);

  const [studentClasses, setStudentClasses] = useState<ClassInformationResponse[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<number | undefined>(user?.classroomId);

  const [terms, setTerms] = useState<GetTermsResponse[]>([]);
  const [grades, setGrades] = useState<StudentGradesResponse[]>([]);
  const [selectedTermId, setSelectedTermId] = useState<number>(1);

  const fetchStudentClasses = async () => {
    if (user?.classroomId) {
      await dispatch(getAllClasses());
      const filteredClasses = classes.filter((classItem: ClassInformationResponse) => classItem.id <= user.classroomId);
      setStudentClasses(filteredClasses);
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUserDetailById(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (user?.classroomId) {
      setSelectedClassId(user.classroomId);
    }
  }, [user]);

  useEffect(() => {
    if (user && classes && selectedClassId !== undefined) {
      dispatch(getLessonsBySchoolIdAndClassId({ schoolId: user.schoolId, classId: selectedClassId }));
    }
  }, [dispatch, user, selectedClassId]);


  useEffect(() => {
    fetchStudentClasses();
  }, [user]);

  useEffect(() => {
    dispatch(getGradeTypes());
  }, [dispatch])


  useEffect(() => {
    if (user && classes && selectedClassId !== undefined) {
      dispatch(getLessonsBySchoolIdAndClassId({ schoolId: user.schoolId, classId: selectedClassId }));
    }
  }, [dispatch, user, selectedClassId]);

  useEffect(() => {
    if (user && user.studentId !== undefined) {
      dispatch(getStudentGrades(user.studentId));
    }
  }, [user, dispatch])



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
        {studentClasses && studentClasses.map((classItem: any, index: number) => (
          <option key={index} value={classItem.id}>
            {classItem.name}. Sınıf
          </option>
        ))}
      </Form.Select>

      {/* <div className="terms">
        {terms.map((term) => (
          <Button key={term.id} onClick={() => handleTermClick(term.id)}>{term.name}. Dönem</Button>
        ))}
      </div> */}

      <Card className="grades-card">
        <Table striped bordered hover>
          <thead className="grades">
            <tr>
              <th>Dersler</th>
              {gradeType && gradeType.map((type) => (
                <th
                  key={type.id}
                  colSpan={type.gradeCount}
                // className={typeIndex === 0 ? "lesson-name" : ""}
                >
                  {type.name}
                </th>
              ))}
            </tr>
            <tr>
              <th></th>
              {/* number of colspan */}
              {gradeType && gradeType.map((type, typeIndex) => (
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
            {lesson && lesson.lessons.map((lessonItem) => {
              const lessonGrades = studentGrade?.studentGrades.flatMap((sg) =>
                sg.termNames.flatMap((tn) =>
                  tn.lessons.find((l) => l.lessonId === lessonItem.lessonId)?.grades || []
                )
              ) || [];

              return (
                <tr key={lessonItem.lessonId}>
                  <td>{lessonItem.lessonName}</td>
                  {gradeType && gradeType.map((type) => {
                    const typeGrades = lessonGrades.find((lg) => lg.gradeTypeName === type.name)?.gradesDto || [];


                    const grades = Array.from({ length: type.gradeCount }).map((_, index) => {
                      const grade = typeGrades.find(g => g.examCount === index + 1)?.grade;
                      return (
                        <td key={index}>
                          {grade !== undefined ? grade : ''}
                        </td>
                      );
                    });

                    return grades;
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </Container >
  );
};
export default Grades;
