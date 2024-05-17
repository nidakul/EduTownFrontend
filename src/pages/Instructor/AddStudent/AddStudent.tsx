import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./addStudent.css";
import GeneratePassword from "../../../components/GeneratePassword/GeneratePassword";

type Props = {};

const AddStudent = (props: Props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Container className="add-student-container">
      <Form className="form-add-student">
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Sınıf
          </Form.Label>
          <Col sm={4}>
            <Form.Select>
              <option>Sınıf Seçiniz</option>
            </Form.Select>
          </Col>
          <Form.Label column sm={2}>
            Kayıt Tarihi:
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="date"
              //   value = getDate()
            ></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            TC Kimlik No:
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="text"
              placeholder="TC Kimlik No Giriniz"
              // value =
            ></Form.Control>
          </Col>
          <Form.Label column sm={2}>
            Kayıt Tarihi:
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="date"
              //   value = getDate()
            ></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Ad:
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
          <GeneratePassword show={show} handleClose={handleClose} />
        </Form.Group>
        <Form.Group>
          {/* Oluşturulan Şifre: {password} */}
        </Form.Group>

      </Form>
    </Container>
  );
};

export default AddStudent;
