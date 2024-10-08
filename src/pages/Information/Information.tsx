import React, { useEffect, useRef, useState } from 'react';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import './information.css'
import { getUserId } from '../../services/identityService';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/configureStore';
import { getUserDetailById } from '../../store/user/userSlice';
import FormattedDate from '../../utilities/Helpers/formattedDate';
import IconTemp from '../../utilities/Helpers/iconTemp';
import { editIcon, editImgIcon } from '../../utilities/Constants/iconsList';
import { updateStudent } from '../../store/student/studentSlice';
import { StudentRequest } from '../../models/requests/studentRequest';
import { uploadToCloudinary } from '../../utilities/Helpers/cloudinary';
import { getAllCities } from '../../store/city/citySlice';

type Props = {};

const Information: React.FC<Props> = () => {
    const userId = getUserId();
    const user = useSelector((state: RootState) => state.user.user);
    const city = useSelector((state: RootState) => state.city.items);
    const dispatch = useDispatch<AppDispatch>();
    const [editable, setEditable] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const [updateForm, setUpdateForm] = useState({
        userId: userId || "",
        userForRegisterCommand: {
            imageUrl: user?.imageUrl || "",
            email: user?.email || "",
            password: ""
        },
        birthdate: user?.birthdate ? new Date(user.birthdate) : new Date(),
        birthplace: user?.birthplace || ""
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            setSelectedImage(files[0]); // Seçilen dosyayı sakla
            const imageUrl = URL.createObjectURL(files[0]);
            setUpdateForm((prevData) => ({
                ...prevData,
                userForRegisterCommand: {
                    ...prevData.userForRegisterCommand,
                    imageUrl: imageUrl
                }
            }))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdateForm(prevForm => ({
            ...prevForm,
            userForRegisterCommand: {
                ...prevForm.userForRegisterCommand,
                [name]: value
            },
            [name]: value
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUpdateForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateForm(prevForm => ({
            ...prevForm,
            birthdate: new Date(e.target.value)
        }));
    };

    const handleCancel = () => {
        setEditable(false);
        setSelectedImage(null);
        setUpdateForm({
            userId: userId || "",
            userForRegisterCommand: {
                imageUrl: user?.imageUrl || "",
                email: user?.email || "",
                password: ""
            },
            birthdate: user?.birthdate ? new Date(user.birthdate) : new Date(),
            birthplace: user?.birthplace || ""
        });
    }


    const handleUpdateStudent = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let imageUrl = updateForm.userForRegisterCommand.imageUrl;
            if (selectedImage) {
                imageUrl = await uploadToCloudinary(selectedImage);
            }
            const studentData: StudentRequest = {
                id: user?.studentId,
                userId: userId || "",
                studentNo: user?.studentNo || "",
                birthdate: updateForm.birthdate.toISOString().split('T')[0],
                birthplace: updateForm.birthplace,
                branchId: user?.branchId || 0,
                classroomId: user?.classroomId || 0,
                userForRegisterCommand: {
                    schoolId: user?.schoolId || 0,
                    password: updateForm.userForRegisterCommand.password,
                    nationalIdentity: user?.nationalIdentity || "",
                    firstName: user?.firstName || "",
                    lastName: user?.lastName || "",
                    email: updateForm.userForRegisterCommand.email,
                    gender: user?.gender || "",
                    imageUrl: imageUrl // Güncellenmiş veya mevcut imageUrl
                }
            };
            dispatch(updateStudent(studentData));
            setEditable(false);
            alert('Bilgiler güncellendi!');
        } catch (error) {
            console.error("Güncelleme hatası:", error);
            alert('Güncellenirken bir hata oluştu.');
        }
    };

    useEffect(() => {
        if (userId) {
            dispatch(getUserDetailById(userId));
        }
    }, [userId, dispatch])

    useEffect(() => {
        dispatch(getAllCities());
    }, [])

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
                            <img src={updateForm.userForRegisterCommand.imageUrl || user?.imageUrl || "/images/profile-image.png"} className="img-fluid rounded-circle" alt="profile-image" />
                            {editable && (
                                <>
                                    <button className='btn-with-icon'
                                        onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                                        < IconTemp {...editImgIcon} />
                                    </button>
                                    <input type='file'
                                        ref={fileInputRef}
                                        style={{ display: "none" }}
                                        onChange={handleFileChange}
                                        accept="image/*" //only image
                                    />
                                </>
                            )}
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
                                {editable ?
                                    <Form.Control
                                        className='form-input'
                                        type='email'
                                        name="email"
                                        value={updateForm.userForRegisterCommand.email}
                                        onChange={handleChange}
                                    />
                                    : <Card.Text>{user?.email}</Card.Text>
                                }
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
                                    ? <Form.Select
                                        id='birtplace'
                                        className='form-input'
                                        aria-label="Select birtplace"
                                        name="birthplace"
                                        value={updateForm.birthplace}
                                        onChange={handleSelectChange}
                                    >
                                        {city && city.map((cityItem: any) => (
                                            <option key={cityItem.id} value={cityItem.name}>
                                                {cityItem.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    : <Card.Text>{user?.birthplace}</Card.Text>
                                }
                            </Col>
                            <Col>
                                <Card.Title>Doğum Tarihi</Card.Title>
                                {editable ?
                                    <Form.Control
                                        className='form-input'
                                        type="date"
                                        name="birthdate"
                                        value={updateForm.birthdate.toISOString().split('T')[0]}
                                        onChange={handleDateChange}
                                    ></Form.Control> :
                                    <Card.Text><FormattedDate format='dateOnly' date={user?.birthdate} /></Card.Text>
                                }
                            </Col>
                        </Row>
                        {editable ?
                            <Card.Text className='information-text'>*Düzenleyemediğiniz hatalı kısımları okul idaresine bildiriniz.</Card.Text> : ""}
                    </Card.Body>
                    {editable ?
                        <div className='information-btn'>
                            <Button className='form-btn' onClick={handleCancel}>İptal</Button>
                            <Button className='form-btn' onClick={handleUpdateStudent}>Güncelle</Button>
                        </div>
                        : ""
                    }
                </Card>
            </Form>
        </Container >
    );
};

export default Information;


