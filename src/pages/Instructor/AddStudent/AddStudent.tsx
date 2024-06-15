import React, { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./addStudent.css";
import GeneratePassword from "../../../components/GeneratePassword/GeneratePassword";
import studentService from "../../../services/studentService";

type Props = {};

const AddStudent = (props: Props) => {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    studentNo: "",
    schoolId: 2,
    classroomId: 1,
    nationalIdentity: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    birthdate: new Date(),
    birthplace: "",
    branch: "",
    imageUrl: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e: any) => {
    const { name, value,  } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
  };

  const setGeneratedPassword = (generatedPassword: string) => {
    setPassword(generatedPassword);
    setFormData((prevData) => ({
      ...prevData,
      password: generatedPassword,
    }));
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.password) {
      console.log("şifre alınmadı!");
    }
    try {
      await studentService.addStudent({ ...formData });
      console.log("Öğrenci başarıyla eklendi!");
    } catch (error) {
      console.log("Öğrenci eklenirken bir hata oluştu.", error);
    }
  };
  console.log(formData);
  console.log(password);

  return (
    <Container className="add-student-container">
      <Form className="form-add-student" onSubmit={handleSubmit}>
        <div className="add-student-image">
          <Button className="profile-image-btn">
            <img
              src="/images/userIcon.svg"
              className="img-fluid rounded-circle"
            />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            name="imageUrl"
            onChange={handleChange}
          />
        </div>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Sınıf
          </Form.Label>
          <Col sm={4}>
            <Form.Select
              name="classroomId"
              value={formData.classroomId}
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
              value={formData.nationalIdentity}
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
              value={formData.firstName}
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
              value={formData.lastName}
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
              value={formData.birthdate.toISOString().split("T")[0]}
              onChange={handleChange}
            ></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Cinsiyet
          </Form.Label>
          <Col sm={4}>
            <Form.Select>
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
            <Form.Group className="submit-button">
              <Button type="submit" className="form-btn">
                Kaydet
              </Button>
            </Form.Group>
          </Form.Group>
        )}
      </Form>
    </Container>
  );
};

export default AddStudent;
