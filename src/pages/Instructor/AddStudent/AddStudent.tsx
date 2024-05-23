import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./addStudent.css";
import GeneratePassword from "../../../components/GeneratePassword/GeneratePassword";

type Props = {};

const AddStudent = (props: Props) => {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Container className="add-student-container">
      <Form className="form-add-student">
        <div className="add-student-image">
          <img
            className="img-fluid rounded"
            src="https://media.istockphoto.com/id/1318858332/tr/foto%C4%9Fraf/ofiste-poz-veren-g%C3%BCl%C3%BCmseyen-kad%C4%B1n-%C3%A7al%C4%B1%C5%9Fan%C4%B1n-vesikal%C4%B1k-portresi.jpg?s=1024x1024&w=is&k=20&c=9fZmmIVi9BzG2-Bk3VEoyPqqYp0G-bZP9W7qtAY7V_w="
          />
        </div>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Sınıf / Cinsiyette ekle
          </Form.Label>
          <Col sm={4}>
            <Form.Select>
              <option>Sınıf Seçiniz</option>
            </Form.Select>
          </Col>
          <Form.Label column sm={2}>
            Şube
          </Form.Label>
          <Col sm={4}>
            <Form.Select>
              <option>Şube Seçiniz</option>
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
              // value =
            ></Form.Control>
          </Col>
          <Form.Label column sm={2}>
            Okul Numarası
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="text"
              placeholder="Okul Numarası Giriniz"
              // value =
            ></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Ad
          </Form.Label>
          <Col sm={4}>
            <Form.Control type="text" placeholder="Ad Giriniz"></Form.Control>
          </Col>
          <Form.Label column sm={2}>
            Soyad:
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="text"
              placeholder="Soyad Giriniz"
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
            ></Form.Control>
          </Col>
          <Form.Label column sm={2}>
            Doğum Tarihi:
          </Form.Label>
          <Col sm={4}>
            <Form.Control type="date"></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group className="generate-password-button">
          <Button type="button" className="form-btn" onClick={handleShow}>
            Şifre Al
          </Button>
          <GeneratePassword
            show={show}
            handleClose={handleClose}
            setGeneratedPassword={setPassword}
          />
        </Form.Group>
        {password && <Form.Group>Oluşturulan Şifre: {password}</Form.Group>}
      </Form>
    </Container>
  );
};

export default AddStudent;
