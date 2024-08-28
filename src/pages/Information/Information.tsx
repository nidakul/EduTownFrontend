import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import './information.css'
import { getUserId } from '../../services/identityService';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/configureStore';
import { getUserDetailById } from '../../store/user/userSlice';
import FormattedDate from '../../utilities/Helpers/formattedDate';
import IconTemp from '../../utilities/Helpers/iconTemp';
import { editIcon, editImgIcon } from '../../utilities/Constants/iconsList';

type Props = {};

const Information: React.FC<Props> = () => {
    const userId = getUserId();
    const user = useSelector((state: RootState) => state.user.items);
    const dispatch = useDispatch<AppDispatch>();
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        if (userId) {
            dispatch(getUserDetailById(userId));
        }
    }, [userId])

    return (
        <Container className='information'>
            <Form>
                <h4>Kişisel Bilgilerim</ h4>
                <Card>
                    <Card.Body className='information-card'>
                        <button className='btn-with-icon' onClick={() => setEditable(true)}>
                            <IconTemp {...editIcon} />
                        </button>
                        <div className='information-img'>
                            {editable && (
                                <button className='btn-with-icon'>
                                    <IconTemp {...editImgIcon} />
                                </button>
                            )}
                            <img src={user?.imageUrl} className="img-fluid rounded" />
                        </div>

                        <Row >
                            <Col>
                                <Card.Title>İsim</Card.Title>
                                <Card.Text>{user?.firstName}</Card.Text>
                            </Col>
                            <Col>
                                <Card.Title>Soyisim</Card.Title>
                                <Card.Text>{user?.lastName}</Card.Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card.Title>Okul</Card.Title>
                                <Card.Text>{user?.schoolName}</Card.Text>
                            </Col>
                            <Col>
                                <Card.Title>Sınıf - Şube</Card.Title>
                                <Card.Text>{user?.classroomName} / {user?.branchName}</Card.Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card.Title>T.C. Kimlik Numarası</Card.Title>
                                <Card.Text>{user?.nationalIdentity}</Card.Text>
                            </Col>
                            <Col>
                                <Card.Title>Okul numarası</Card.Title>
                                <Card.Text>{user?.studentNo}</Card.Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card.Title>Email</Card.Title>
                                <Card.Text>{user?.email}</Card.Text>
                            </Col>
                            <Col>
                                <Card.Title>Cinsiyet</Card.Title>
                                <Card.Text>{user?.gender}</Card.Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card.Title>Doğum Yeri</Card.Title>
                                {editable
                                    ? <Form.Control
                                        type='text'
                                        placeholder='Doğum Yerinizi Giriniz'
                                        name="birthPlace"
                                    // value={formData.studentNo}
                                    // onChange={handleChange}
                                    ></Form.Control>
                                    : <Card.Text>{user?.birthplace}</Card.Text>
                                }
                            </Col>
                            <Col>
                                <Card.Title>Doğum Tarihi</Card.Title>
                                {editable ?
                                    <Form.Control
                                        type="date"
                                        name="birthdate"
                                    // value={formData.birthdate.toISOString().split('T')[0]}
                                    // onChange={handleChange}
                                    ></Form.Control> :
                                    <Card.Text><FormattedDate date={user?.birthdate} ></FormattedDate></Card.Text>
                                }
                            </Col>
                        </Row>
                        {editable ?
                            <Card.Text className='information-text'>*Düzenleyemediğiniz hatalı kısımları lütfen okul idaresine bildiriniz.</Card.Text> : ""}
                    </Card.Body>
                    {editable ?
                        <div className='information-btn'>
                            <Button className='form-btn' onClick={() => setEditable(false)}>İptal</Button>
                            <Button className='form-btn'>Güncelle</Button>
                        </div>
                        : ""
                    }
                </Card>
            </Form>
        </Container >
    );
};

export default Information;
