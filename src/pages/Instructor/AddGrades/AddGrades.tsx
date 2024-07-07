import React, { useState } from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import "./addGrades.css";
import { getUserId } from '../../../services/identityService';
import schoolService from '../../../services/schoolService';
import lessonService from '../../../services/lessonService';
import { GetLessonsBySchoolIdAndClassIdResponse } from '../../../models/responses/getLessonsBySchoolIdAndClassIdResponse';

type Props = {}

const AddGrades = (props: Props) => {
    const userId = getUserId();
    const [lessons, setLessons] = useState<GetLessonsBySchoolIdAndClassIdResponse>();

    const fetchLessons = async (schoolId: number, classroomId: number) => {
        try {
            const lessons = await lessonService.getLessonsBySchoolIdAndClassId(schoolId, classroomId);
            setLessons(lessons.data);
            console.log("lessons", lessons.data);
        } catch (error) {
            console.error("Failed to fetch lessons:", error);
        }
    }
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
                                // name="classroomId"
                                // value={formData.userForRegisterCommand.classroomId}
                                // onChange={handleChange}
                                >
                                    <option>Sınıf-Şube Seçiniz</option>
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