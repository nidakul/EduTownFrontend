import { Button, Container, Form } from "react-bootstrap";
import "./login.css";
const Login = () => {
  return (
    <Container>
        <img className="login-logo" src="/public/images/logo.svg"/>
      <div className="big">
        <div className="medium">
          <div className="small">
            <img className="login-image" src="/public/images/studying.png" />
          </div>
        </div>
      </div>
      <Form className="login-form">
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Kullanıcı Adı</Form.Label>
          <Form.Control
            type="text"
            placeholder="Kullanıcı Adınızı Giriniz"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Şifre</Form.Label>
          <Form.Control
            type="password"
            placeholder="Şifrenizi Giriniz"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="password-reset-button">
          <Form.Label>Şifremi Unuttum</Form.Label>
          <Button type="submit" className="form-btn">
            Giriş
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Login;
