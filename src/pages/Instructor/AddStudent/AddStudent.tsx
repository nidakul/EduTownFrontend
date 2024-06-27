import React, { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./addStudent.css";
import GeneratePassword from "../../../components/GeneratePassword/GeneratePassword";
import AddStudentModal from "../../../components/AddStudentModal/AddStudentModal";

type Props = {};

const AddStudent = (props: Props) => {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    studentNo: "",
    birthdate: new Date(),
    birthplace: "",
    branch: "",
    userForRegisterCommand: {
      schoolId: 2,
      classroomId: 1,
      nationalIdentity: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      imageUrl: "",
      gender: ""
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name in formData.userForRegisterCommand) {
      setFormData((prevData) => ({
        ...prevData,
        userForRegisterCommand: {
          ...prevData.userForRegisterCommand,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const setGeneratedPassword = (generatedPassword: string) => {
    setPassword(generatedPassword);
    setFormData((prevData) => ({
      ...prevData,
      userForRegisterCommand: {
        ...prevData.userForRegisterCommand,
        password: generatedPassword
      }
    }));
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        userForRegisterCommand: {
          ...prevData.userForRegisterCommand,
          imageUrl: URL.createObjectURL(files[0])
        }
      }))
    }
  }


  console.log(formData);
  console.log(password);
  console.log(formData.birthdate);

  return (
    <Container className="add-student-container">
      <Form className="form-add-student">
        <div className="add-student-image">
          <Button className="profile-image-btn"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}>
            <img
              src={formData.userForRegisterCommand.imageUrl || "/images/userIcon.svg"}
              className="img-fluid rounded-circle"
            />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            name="imageUrl"
            onChange={handleFileChange}
          />
        </div>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Sınıf
          </Form.Label>
          <Col sm={4}>
            <Form.Select
              name="classroomId"
              value={formData.userForRegisterCommand.classroomId}
              onChange={handleChange}
            >
              <option>Sınıf Seçiniz</option>
            </Form.Select>
          </Col>
          <Form.Label column sm={2}>
            Şube
          </Form.Label>
          <Col sm={4}>
            <Form.Select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
            >
              <option>Şube Seçiniz</option>
              <option>A</option>
              <option>B</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            TC Kimlik No
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="text"
              placeholder="TC Kimlik No Giriniz"
              name="nationalIdentity"
              value={formData.userForRegisterCommand.nationalIdentity}
              onChange={handleChange}
            ></Form.Control>
          </Col>
          <Form.Label column sm={2}>
            Okul Numarası
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="text"
              placeholder="Okul Numarası Giriniz"
              name="studentNo"
              value={formData.studentNo}
              onChange={handleChange}
            ></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Ad
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="text"
              placeholder="Ad Giriniz"
              name="firstName"
              value={formData.userForRegisterCommand.firstName}
              onChange={handleChange}
            ></Form.Control>
          </Col>
          <Form.Label column sm={2}>
            Soyad:
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="text"
              placeholder="Soyad Giriniz"
              name="lastName"
              value={formData.userForRegisterCommand.lastName}
              onChange={handleChange}
            ></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Doğum Yeri:
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="text"
              placeholder="Doğum Yeri Giriniz"
              name="birthplace"
              value={formData.birthplace}
              onChange={handleChange}
            ></Form.Control>
          </Col>
          <Form.Label column sm={2}>
            Doğum Tarihi:
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="date"
              name="birthdate"
              value={formData.birthdate.toISOString().split('T')[0]}
              onChange={handleChange}
            ></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Cinsiyet
          </Form.Label>
          <Col sm={4}>
            <Form.Select
              name="gender"
              value={formData.userForRegisterCommand.gender}
              onChange={handleChange}
            >
              <option>Cinsiyet Seçiniz</option>
              <option>Kadın</option>
              <option>Erkek</option>
            </Form.Select>
          </Col>

          <Form.Label column sm={2}>
            Gir bişey
          </Form.Label>
          <Col sm={4}>
            <Form.Select>
              <option>Gir bişey</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group className="generate-password-button">
          <Button type="button" className="form-btn" onClick={handleShow}>
            Şifre Al
          </Button>
          <GeneratePassword
            show={show}
            handleClose={handleClose}
            setGeneratedPassword={setGeneratedPassword}
          />
        </Form.Group>
        {password && (
          <Form.Group>
            Oluşturulan Şifre: {password}
            <Form.Group className="save-button">
              <AddStudentModal studentData={formData} />
            </Form.Group>
          </Form.Group>
        )}
      </Form>
    </Container>
  );
};

export default AddStudent;
