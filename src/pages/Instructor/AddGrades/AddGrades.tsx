import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import "./addGrades.css";
import { getUserId } from '../../../services/identityService';
import schoolService from '../../../services/schoolService';
import lessonService from '../../../services/lessonService';
import { GetLessonsBySchoolIdAndClassIdResponse } from '../../../models/responses/getLessonsBySchoolIdAndClassIdResponse';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/configureStore';
import { getClassesBySchoolTypeId } from '../../../store/class/classSlice';
import { getSchoolById } from '../../../store/school/schoolSlice';
import { getUserDetailById } from '../../../store/user/userSlice';

type Props = {}

const AddGrades = (props: Props) => {
    const userId = getUserId();
    const [lessons, setLessons] = useState<GetLessonsBySchoolIdAndClassIdResponse>();
    const dispatch = useDispatch<AppDispatch>();
    const classes = useSelector((state: RootState) => state.classes.classes);
    const school = useSelector((state: RootState) => state.school.school);
    const user = useSelector((state: RootState) => state.user.user);
    console.log("user", user);
    const [selectedClassId, setSelectedClassId] = useState<number | undefined>();
    console.log("school", school);

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

    console.log("classes.schoolTypeId", school?.schoolTypeId);

    return (
        <Container>
            <Card>
                <Card.Header>Sınıf-Şube ve Ders Seçiniz</Card.Header>
                <Card.Body>
                    <Form>
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
                                    {classes && classes.classes.map((classItem, index) => (
                                        <option key={index} value={classItem.classroomId}>{classItem.classroomName}. Sınıf</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Form.Label column sm={2}>
                                Ders :
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Select
                                // name="branch"
                                // value={formData.branch}
                                // onChange={handleChange}
                                >
                                    <option>Ders Seçiniz</option>
                                    <option>A</option>
                                    <option>B</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </Form>
                </Card.Body>
                <Card.Header>Not Girişi</Card.Header>
                <Card.Body>
                    <Card>
                        <Card.Header>Sınav Puanları</Card.Header>
                        <Card.Body>
                            <div className='exam'>
                                <Card.Text className='exam-text'>1. Sınav</Card.Text>
                                <Card.Text>1. Sınav</Card.Text>
                            </div>
                        </Card.Body>

                        <Card.Header>Sınav Puanları</Card.Header>

                    </Card>
                    {/* <span className='deneme'>mfdsko</span> */}
                </Card.Body>
            </Card >
        </Container >
    )
}

export default AddGrades;