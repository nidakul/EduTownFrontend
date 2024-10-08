
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import "./addGrades.css";
import { getUserId } from '../../../services/identityService';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/configureStore';
import { getClassesBySchoolTypeId } from '../../../store/class/classSlice';
import { getSchoolById } from '../../../store/school/schoolSlice';
import { getUserDetailById } from '../../../store/user/userSlice';
import { getLessonsBySchoolIdAndClassId } from '../../../store/lesson/lessonSlice';
import { getTerms } from '../../../store/term/termSlice';
import { getGradeTypes } from '../../../store/gradeType/gradeTypeSlice';
import { GetListGradeTypeResponse } from '../../../models/responses/getListGradeTypeResponse';
import { getAllStudents, getStudentGrades } from '../../../store/student/studentSlice';
import { getBranchesBySchoolIdAndClassId } from '../../../store/branch/branchSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { StudentInformationResponse } from '../../../models/responses/studentInformationResponse';

type Props = {}

const AddGrades = (props: Props) => {
    const userId = getUserId();
    const dispatch = useDispatch<AppDispatch>();

    const classes = useSelector((state: RootState) => state.classes.classes);
    const school = useSelector((state: RootState) => state.school.school);
    const lesson = useSelector((state: RootState) => state.lesson.lesson);
    const branch = useSelector((state: RootState) => state.branch.branch);
    const user = useSelector((state: RootState) => state.user.user);
    const student = useSelector((state: RootState) => state.student.items);
    const studentGrade = useSelector((state: RootState) => state.student.studentGrades);
    const term = useSelector((state: RootState) => state.term.term?.items);
    const gradeType = useSelector((state: RootState) => state.gradeType.gradeType?.items);

    const [selectedClassId, setSelectedClassId] = useState<number | undefined>(undefined);
    const [selectedLessonId, setSelectedLessonId] = useState<number | undefined>();
    const [selectedBranchId, setSelectedBranchId] = useState<number | undefined>();
    const [selectedTermId, setSelectedTermId] = useState<number>();
    const [gradeTypes, setGradeTypes] = useState<GetListGradeTypeResponse[] | undefined>(undefined);
    const [filteredStudents, setFilteredStudents] = useState<StudentInformationResponse[]>([]);
    const [showFilteredStudent, setShowFilteredStudent] = useState(false);

    const [studentGrades, setStudentGrades] = useState<{ [key: string]: any }>({});

    const handleListFilteredStudents = async () => {
        if (selectedClassId && selectedBranchId && student && selectedTermId && selectedLessonId) {
            const filtered = student.filter(student => student.classroomId === selectedClassId && student.branchId === selectedBranchId);
            setFilteredStudents(filtered);
            setShowFilteredStudent(true);

            // Her bir öğrenci için notları al ve state'e ekle
            const newStudentGrades: { [key: string]: any } = {};
            for (const studentItem of filtered) {
                try {
                    const resultAction = await dispatch(getStudentGrades(studentItem.id.toString()));
                    const studentGradeData = unwrapResult(resultAction);
                    newStudentGrades[studentItem.id] = studentGradeData;
                } catch (error) {
                    console.error(`Failed to fetch grades for student ${studentItem.id}:`, error);
                }
            }
            setStudentGrades(newStudentGrades);
        };
    }

    useEffect(() => {
        if (userId) {
            dispatch(getUserDetailById(userId));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (user?.schoolId !== undefined) {
            dispatch(getSchoolById(user.schoolId));
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (school && school.schoolTypeId !== undefined) {
            dispatch(getClassesBySchoolTypeId(school.schoolTypeId));
        }
    }, [dispatch]);

    useEffect(() => {
        if (user && classes && selectedClassId !== undefined) {
            dispatch(getLessonsBySchoolIdAndClassId({ schoolId: user.schoolId, classId: selectedClassId }));
            dispatch(getBranchesBySchoolIdAndClassId({ schoolId: user.schoolId, classId: selectedClassId }));
        }
    }, [dispatch, selectedClassId]);

    useEffect(() => {
        dispatch(getTerms());
        dispatch(getGradeTypes());
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllStudents());
    }, [])

    useEffect(() => {
        if (gradeType) {
            setGradeTypes(gradeType);
        }
    }, [gradeType]);

    return (
        <Container>
            <Card>
                <Form>
                    <Card.Header>Sınıf-Şube ve Ders Seçiniz</Card.Header>
                    <Card.Body className='add-grades-form'>
                        <Row>
                            <Form.Group as={Col} sm={4}>
                                <Form.Select
                                    name="class-select"
                                    value={selectedClassId}
                                    onChange={(e) => setSelectedClassId(Number(e.target.value))}
                                >
                                    <option>Sınıf Seçiniz</option>
                                    {classes && classes.classes.map((classItem) => (
                                        <option key={classItem.classroomId} value={classItem.classroomId}>{classItem.classroomName}. Sınıf</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} sm={4}>
                                <Form.Select
                                    name="branch-select"
                                    value={selectedBranchId}
                                    onChange={(e) => setSelectedBranchId(Number(e.target.value))}
                                >
                                    <option>Şube Seçiniz</option>
                                    {branch && branch.branches.map((branchItem) => (
                                        <option key={branchItem.branchId} value={branchItem.branchId}>{branchItem.branchName}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} sm={4}>
                                <Form.Select
                                    name="lesson"
                                    value={selectedLessonId}
                                    onChange={(e) => setSelectedLessonId(Number(e.target.value))}
                                >
                                    <option>Ders Seçiniz</option>
                                    {lesson && lesson.lessons.map((lessonItem) => (
                                        <option key={lessonItem.lessonId} value={lessonItem.lessonId}>{lessonItem.lessonName}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mt-3">
                            <Form.Group as={Col} className="term-checkbox-group">
                                <Form.Label column sm={12} className="term-label">
                                    Dönem Seçiniz:
                                </Form.Label>
                                <Col sm={12} className='term-checkbox'>
                                    {term && term.map((termItem) => (
                                        <Form.Check
                                            key={termItem.id}
                                            type="radio"
                                            label={`${termItem.name}. Dönem`}
                                            value={termItem.id}
                                            checked={selectedTermId == termItem.id}
                                            aria-label='term-checkbox'
                                            onChange={(e) => setSelectedTermId(Number(e.target.value))}
                                        />
                                    ))}
                                </Col>
                            </Form.Group>
                        </Row>
                    </Card.Body>
                    <Card.Header>Not Girişi</Card.Header>
                    <Card.Body className='gradeType-card'>
                        {gradeType && gradeType.map((gradeTypeItem) => (
                            <Card key={gradeTypeItem.id}>
                                <Card.Header>{gradeTypeItem.name}</Card.Header>
                                <Card.Body >
                                    {Array.from({ length: gradeTypeItem.gradeCount }, (_, index) => (
                                        <Form.Check
                                            className='gradeType-checkbox'
                                            key={index}
                                            type='checkbox'
                                            label={`${index + 1}. Not`}
                                            aria-label={`gradeType-checkbox`}
                                        />
                                    ))}
                                </Card.Body>
                            </Card>
                        ))}
                    </Card.Body>
                </Form >
            </Card >
            <div className='add-grades-btn'>
                <Button className='form-btn-color' onClick={handleListFilteredStudents}>Listele</Button>
            </div>
            {showFilteredStudent && (
                <Card>
                    <Form>
                        <Card.Header>Seçili Alanlara Göre Ders Notu Girişi</Card.Header>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Okul No</th>
                                    <th>Adı Soyadı</th>
                                    {gradeType && gradeType.map((type) => (
                                        <th
                                            key={type.id}
                                            colSpan={type.gradeCount}
                                        >
                                            {type.name}
                                        </th>
                                    ))}
                                    <th>Puanı</th>
                                </tr>
                                <tr>
                                    <th></th>
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
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student) => {
                                    const studentGradesData = studentGrades[student.id];

                                    // İlgili öğrenci için notları ve examCount değerlerini içeren bir dizi oluştur
                                    const gradesByGradeType: { [key: number]: { [key: number]: number | undefined } } = {};
                                    if (studentGradesData && studentGradesData.studentGrades.length > 0) {
                                        studentGradesData.studentGrades.forEach((studentGrade: any) => {
                                            studentGrade.termNames.forEach((termName: any) => {
                                                if (termName.termId === selectedTermId) {
                                                    termName.lessons.forEach((lesson: any) => {
                                                        if (lesson.lessonId === selectedLessonId) {
                                                            lesson.grades.forEach((gradeType: any) => {
                                                                if (!gradesByGradeType[gradeType.gradeTypeId]) {
                                                                    gradesByGradeType[gradeType.gradeTypeId] = {};
                                                                }
                                                                gradeType.gradesDto.forEach((grade: any) => {
                                                                    gradesByGradeType[gradeType.gradeTypeId][grade.examCount] = grade.grade;
                                                                });
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        });
                                    }
                                    return (
                                        <tr key={student.id}>
                                            <td>{student.studentNo}</td>
                                            <td>{`${student.firstName} ${student.lastName}`}</td>
                                            {gradeTypes && gradeTypes.map((gradeTypeItem) => (
                                                Array.from({ length: gradeTypeItem.gradeCount }, (_, index) => (
                                                    <td key={`${student.id}-${gradeTypeItem.id}-${index}`}>
                                                        {gradesByGradeType[gradeTypeItem.id] && gradesByGradeType[gradeTypeItem.id][index + 1] !== undefined ? gradesByGradeType[gradeTypeItem.id][index + 1] : ""}
                                                    </td>
                                                ))
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Form>
                </Card>
            )
            }
        </Container >
    )
}

export default AddGrades;
