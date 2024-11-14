import {
  Button,
  Card,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import "./grades.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../services/identityService";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store/configureStore";
import { getLessonsBySchoolIdAndClassId } from "../../store/lesson/lessonSlice";
import { getAllClasses } from "../../store/class/classSlice";
import { ClassInformationResponse } from "../../models/responses/classInformationResponse";
import { getStudentGrades } from "../../store/student/studentSlice";
import { getGradeTypes } from "../../store/gradeType/gradeTypeSlice";
import { getUserDetailById } from "../../store/user/userSlice";
import { getTerms } from "../../store/term/termSlice";

type Props = {};

const Grades = (props: Props) => {
  const userId = getUserId();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const lesson = useSelector((state: RootState) => state.lesson.lesson);
  const classes = useSelector((state: RootState) => state.classes.items);
  const gradeType = useSelector((state: RootState) => state.gradeType.gradeType?.items);
  const studentGrade = useSelector((state: RootState) => state.student.studentGrades);
  const term = useSelector((state: RootState) => state.term.term?.items);

  const [studentClasses, setStudentClasses] = useState<ClassInformationResponse[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<number | undefined>(user?.classroomId);
  const [selectedTermId, setSelectedTermId] = useState<number>(1);

  // Seçilen döneme göre filtreleme 
  const filteredStudentGrades = studentGrade?.studentGrades
    .filter((sg) => sg.classroomId === selectedClassId)
    .flatMap((sg) =>
      sg.termNames
        .filter((tn) => tn.termId === selectedTermId)
        .flatMap((tn) =>
          tn.lessons.flatMap((l) => ({
            lessonId: l.lessonId,
            lessonName: l.lessonName,
            grades: l.grades || [],
          }))
        )
    ) || [];

  useEffect(() => {
    if (userId) {
      dispatch(getUserDetailById(userId));
    }
  }, [dispatch, userId]);


  useEffect(() => {
    if (user?.classroomId) {
      dispatch(getAllClasses());
    }
  }, [user]);

  useEffect(() => {
    if (classes.length > 0 && user?.classroomId) {
      const filteredClasses = classes.filter(
        (classItem: ClassInformationResponse) => classItem.id <= user.classroomId
      );
      setStudentClasses(filteredClasses);
    }
  }, [classes, user]);

  useEffect(() => {
    dispatch(getGradeTypes());
    dispatch(getTerms());
  }, [dispatch])

  useEffect(() => {
    if (user && user.studentId !== undefined) {
      dispatch(getStudentGrades(user.studentId));
    }
  }, [user, dispatch])

  useEffect(() => {
    if (user && selectedClassId !== undefined) {
      dispatch(getLessonsBySchoolIdAndClassId({ schoolId: user.schoolId, classId: selectedClassId }));
    }
  }, [dispatch, selectedClassId]);

  useEffect(() => {
    if (studentClasses.length > 0 && user?.classroomId) {
      const defaultClass = studentClasses.find(c => c.id === user.classroomId);
      if (defaultClass) {
        setSelectedClassId(defaultClass.id);
      }
    }
  }, [studentClasses, user?.classroomId]);

  return (
    <Container className="grades-container">
      <Form.Label htmlFor="grades-select">Öğrencinin Sınıfları:</Form.Label>
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


      <div className="terms">
        {term?.map((term) => (
          <Button key={term.id} onClick={() => setSelectedTermId(term.id)}>{term.name}. Dönem</Button>
        ))}
      </div>

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
                    <th key={`${typeIndex}-${countIndex}`}
                      className="gradeType-colspan">
                      {countIndex + 1}
                    </th>
                  ))
                  : (<th key={`${typeIndex}-empty`}></th>
                  )
              ))}
            </tr>
          </thead>
          <tbody>
            {lesson?.lessons?.map((lessonItem: any) => {
              const lessonGrades = filteredStudentGrades.find((lg) => lg.lessonId === lessonItem.lessonId)?.grades || [];

              return (
                <tr key={lessonItem.lessonId}>
                  <td className="lesson-name">{lessonItem.lessonName}</td>
                  {gradeType && gradeType.map((type) => {
                    const typeGrades = lessonGrades.find((lg) => lg.gradeTypeName === type.name)?.gradesDto || [];

                    return Array.from({ length: type.gradeCount }).map((_, index) => {
                      const grade = typeGrades.find(g => g.examCount === index + 1)?.grade;
                      return (
                        <td key={index}>
                          {grade !== undefined ? grade : ''}
                        </td>
                      );
                    });
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


