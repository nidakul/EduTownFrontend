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

type Props = {}

const AddGrades = (props: Props) => {
    const userId = getUserId();
    const [lessons, setLessons] = useState<GetLessonsBySchoolIdAndClassIdResponse>();
    const dispatch = useDispatch<AppDispatch>();
    const classes = useSelector((state: RootState) => state.classes.classes);
    const school = useSelector((state: RootState) => state.school);

    useEffect(() => {
        dispatch(getSchoolById(1));
    }, [dispatch]);

    useEffect(() => {
        if (classes && classes.schoolTypeId !== undefined) {
            dispatch(getClassesBySchoolTypeId(classes.schoolTypeId));
        }
    }, [classes, dispatch]);

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
                                // value={selectedClassId}
                                // onChange={(e) => setSelectedClassId(Number(e.target.value))}
                                >
                                    <option>Sınıf-Şube Seçiniz</option>
                                    {classes && classes.classroomName && classes.classroomName.map((classItem, index) => (
                                        <option key={index} value={classItem}>{classItem}. Sınıf</option>
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