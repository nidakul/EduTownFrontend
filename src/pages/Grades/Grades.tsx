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
import userService from "../../services/userService";
import { setUser } from "../../store/user/userSlice";
import { useEffect, useState } from "react";
import gradeTypeService from "../../services/gradeTypeService";
import { GetListGradeTypeResponse } from "../../models/responses/getListGradeTypeResponse";
import lessonService from "../../services/lessonService";
import { GetLessonsBySchoolIdAndClassIdResponse } from "../../models/responses/getLessonsBySchoolIdAndClassIdResponse";
import termService from "../../services/termService";
import { GetTermsResponse } from "../../models/responses/getTermsResponse";
import { StudentGradesResponse } from "../../models/responses/studentGradesResponse";
import schoolTypeService from "../../services/schoolTypeService";
import { AppDispatch, RootState } from "../../store/configureStore";
import { getSchoolById } from "../../store/school/schoolSlice";
import { getLessonsBySchoolIdAndClassId } from "../../store/lesson/lessonSlice";
import classService from "../../services/classService";
import { getAllClasses } from "../../store/class/classSlice";
import { ClassInformationResponse } from "../../models/responses/classInformationResponse";

type Props = {};

const Grades = (props: Props) => {
  const userId = getUserId();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.items);
  const lesson = useSelector((state: RootState) => state.lesson.lesson);
  const classes = useSelector((state: RootState) => state.classes.items);

  const [studentClasses, setStudentClasses] = useState<ClassInformationResponse[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<number | undefined>(user?.classroomId);

  const school = useSelector((state: RootState) => state.school);
  const [gradeType, setGradeType] = useState<GetListGradeTypeResponse[]>([]);
  const [schoolId, setSchoolId] = useState<number>();
  const [classId, setClassId] = useState<number>(); //user's classroomId


  const [terms, setTerms] = useState<GetTermsResponse[]>([]);
  const [grades, setGrades] = useState<StudentGradesResponse[]>([]);
  const [selectedTermId, setSelectedTermId] = useState<number>(1);

  const fetchStudentClasses = async () => {
    if (user?.classroomId) {
      await dispatch(getAllClasses()); // dispatch işleminin tamamlanmasını bekleyin
      const filteredClasses = classes.filter((classItem: ClassInformationResponse) => classItem.id <= user.classroomId);
      setStudentClasses(filteredClasses);
    }
  };
  console.log("lesson", lesson);
  const fetchGradeType = async () => {
    try {
      const response = await gradeTypeService.getList();
      setGradeType(response.data.items);
    } catch (error) {
      console.error("Failed to fetch gradeTypes:", error);
    }
  };

  const fetchTerms = async () => {
    try {
      const terms = await termService.getList();
      setTerms(terms.data.items);
    } catch (error) {
      console.error("Failed to fetch terms:", error);
    }
  }

  const handleTermClick = (termId: number) => {
    console.log(termId, "tıklandı");
    setSelectedTermId(termId);
  }

  useEffect(() => {
    // fetchStudentGrades();
    fetchGradeType();
    fetchTerms();
  }, [dispatch, userId]);

  useEffect(() => {
    if (schoolId) {
      dispatch(getSchoolById(schoolId));
    }
  }, [schoolId, dispatch])

  useEffect(() => {
    if (user && classes && selectedClassId !== undefined) {
      dispatch(getLessonsBySchoolIdAndClassId({ schoolId: user.schoolId, classId: selectedClassId }));
    }
  }, [dispatch, user, selectedClassId]);


  useEffect(() => {
    fetchStudentClasses();
  }, [user]);

  useEffect(() => {
    if (user && classes && selectedClassId !== undefined) {
      dispatch(getLessonsBySchoolIdAndClassId({ schoolId: user.schoolId, classId: selectedClassId }));
    }
  }, [dispatch, user, selectedClassId]);

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

      <div className="terms">
        {terms.map((term) => (
          <Button key={term.id} onClick={() => handleTermClick(term.id)}>{term.name}. Dönem</Button>
        ))}
      </div>

      <Card className="grades-card">
        <Table striped bordered hover>
          <thead className="grades">
            <tr>
              <th>Dersler</th>
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
              <th></th>
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
            {lesson && lesson.lessons && lesson.lessons.map((lessonItem) => (
              <tr key={lessonItem.lessonId}>
                <td>{lessonItem.lessonName}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container >
  );
};
export default Grades;
