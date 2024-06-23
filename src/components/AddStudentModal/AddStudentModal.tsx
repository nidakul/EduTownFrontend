import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import "./addStudentModal.css"
import { useState } from "react";
import studentService from "../../services/studentService";

type Props = {
    studentData: any;
}

const AddStudentModal = (props: Props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { userForRegisterCommand, studentNo, birthdate, birthplace, branch } = props.studentData;

    const addStudent = async (e: any) => {
        try {
            await studentService.addStudent({ ...props.studentData });
            console.log("Öğrenci başarıyla eklendi!");
        } catch (error) {
            console.log("Öğrenci eklenirken bir hata oluştu.", error);
        }
    }; 

    return (
        <>
            <Button className="form-btn" onClick={handleShow}>
                Kaydet
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Öğrenci Bilgileri</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="add-student-image">
                        <img
                            src={userForRegisterCommand.imageUrl || "/images/userIcon.svg"}
                            className="img-fluid rounded-circle"
                        />
                    </div>
                    <div className="add-student-modal">
                        <p className="student-name">{userForRegisterCommand.firstName} {userForRegisterCommand.lastName}</p>
                        <p>okul ismini gir</p>
                        <p>Sınıf/{branch}</p> 
                    </div>
                    <Container>
                        <Row> 
                            <Col>
                                <p>Tc Kimlik No: {userForRegisterCommand.nationalIdentity}</p>
                            </Col>
                            <Col>
                                <p>Okul Numarası: {studentNo}</p>
                            </Col> 
                        </Row>
                        <Row>
                            <Col>
                                <p>Doğum Yeri: {birthplace}</p>
                            </Col>
                            <Col>
                                {/* <p>Doğum Tarihi: {birthdate}</p> */}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Cinsiyet: {userForRegisterCommand.gender}</p>
                            </Col>
                            <Col>
                                <p>Gir bişey</p>
                            </Col>
                        </Row>
                    </Container>
                    <p>Şifre: {userForRegisterCommand.password} </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="form-btn" onClick={addStudent}>
                        Onayla
                    </Button>
                    <Button className="form-close-btn" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddStudentModal;
