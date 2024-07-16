import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
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

type Props = {}

const AddGrades = (props: Props) => {
    const userId = getUserId();
    const dispatch = useDispatch<AppDispatch>();
    const classes = useSelector((state: RootState) => state.classes.classes);
    const school = useSelector((state: RootState) => state.school.school);
    const lesson = useSelector((state: RootState) => state.lesson.lesson);
    const user = useSelector((state: RootState) => state.user.user);
    const term = useSelector((state: RootState) => state.term.term?.items);
    const gradeType = useSelector((state: RootState) => state.gradeType.gradeType?.items);
    console.log("user", user);
    const [selectedClassId, setSelectedClassId] = useState<number | undefined>(undefined);
    const [selectedLessonId, setSelectedLessonId] = useState<number | undefined>(undefined);
    const [selectedTermId, setSelectedTermId] = useState<number>();
    console.log("selectedClassId", selectedClassId);
    console.log("selectedLessonId", selectedLessonId);
    console.log("type", gradeType);

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
    }, [dispatch, school]);

    useEffect(() => {
        if (user && classes && selectedClassId !== undefined)
            dispatch(getLessonsBySchoolIdAndClassId({ schoolId: user.schoolId, classId: selectedClassId }));
    }, [dispatch, user, selectedClassId]);

    useEffect(() => {
        dispatch(getTerms());
        dispatch(getGradeTypes());
    }, [])


    return (
        <Container>
            <Form>
                <Card>
                    <Card.Header>Sınıf-Şube ve Ders Seçiniz</Card.Header>
                    <Card.Body className='add-grades-form'>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>
                                Sınıf - Şube :
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Select
                                    name="class-select"
                                    value={selectedClassId}
                                    onChange={(e) => setSelectedClassId(Number(e.target.value))}
                                >
                                    <option>Sınıf-Şube Seçiniz</option>
                                    {classes && classes.classes.map((classItem) => (
                                        <option key={classItem.classroomId} value={classItem.classroomId}>{classItem.classroomName}. Sınıf</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Form.Label column sm={2}>
                                Ders :
                            </Form.Label>
                            <Col sm={4}>
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
                            </Col>
                            <Form.Group as={Row} className="term-checkbox-group">
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
                        </Form.Group>


                    </Card.Body>
                    <Card.Header>Not Girişi</Card.Header>
                    <Card.Body>
                        {gradeType && gradeType.map((gradeTypeItem) => (
                            <Card>
                                <Card.Header>{gradeTypeItem.name}</Card.Header>
                                <Card.Body>
                                    <div className='exam'>
                                        <Card.Text className='exam-text'>1. Sınav</Card.Text>
                                        <Card.Text>1. Sınav</Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}

                    </Card.Body>
                </Card >
            </Form>
        </Container>
    )
}

export default AddGrades;