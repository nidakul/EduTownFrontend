import React, { useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './information.css'
import { getUserId } from '../../services/identityService';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/configureStore';
import { getUserDetailById } from '../../store/user/userSlice';
import FormattedDate from '../../utilities/Helpers/formattedDate';
import IconTemp from '../../utilities/Helpers/iconTemp';
import { editIcon } from '../../utilities/Constants/iconsList';

type Props = {};

const Information: React.FC<Props> = () => {
    const userId = getUserId();
    const user = useSelector((state: RootState) => state.user.items);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (userId) {
            dispatch(getUserDetailById(userId));
        }
    }, [userId])

    return (
        <Container className='information'>
            <h4>Kişisel Bilgilerim</ h4>
            <Card>
                <Card.Body className='information-card'>
                    <IconTemp {...editIcon} mainClassName='btn-with-icon' />
                    <div className='information-img'>
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
                            <Card.Text>{user?.birthplace}</Card.Text>
                        </Col>
                        <Col>
                            <Card.Title>Doğum Tarihi</Card.Title>
                            <Card.Text><FormattedDate date={user?.birthdate} ></FormattedDate></Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container >
    );
};

export default Information;
