import { Button, Container, Form } from "react-bootstrap";
import "./login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../services/authService";
import { authActions } from "../../store/auth/authSlice";
import { LoginRequest } from "../../models/requests/loginRequest";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../../utilities/Constants/parseJwt";
import { setUserId } from "../../services/identityService";

const Login = () => {
  const [nationalIdentity, setNationalIdentity] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try { 
      const userData: LoginRequest = { nationalIdentity, password };
      const response = await authService.login(userData);
      console.log("response", response);
      console.log("headers", response.headers);
      dispatch(authActions.isAuthenticated(true));
      const decodedToken = parseJwt(response.accessToken.token); 
      const userId =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
      setUserId(userId);
      console.log("userId", userId);
      // navigate("/");
    } catch (error: any) {
      if (error.isAxiosError) {
        console.error("Ağ hatası:", error.message);
        console.error("Axios detayları:", error.response);
      } else {
        console.error("Diğer hata:", error);
      }
    }
  };

  return (
    <Container>
      <img className="login-logo" src="/images/edu.svg" />
      <div className="big">
        <div className="medium">
          <div className="small">
            <img className="login-image" src="/images/studying.png" />
          </div>
        </div>
      </div>
      <Form className="login-form" onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Kullanıcı Adı</Form.Label>
          <Form.Control
            type="text"
            placeholder="Kullanıcı Adınızı Giriniz"
            value={nationalIdentity}
            onChange={(e) => setNationalIdentity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Şifre</Form.Label>
          <Form.Control
            type="password"
            placeholder="Şifrenizi Giriniz"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="password-reset-button">
          <Form.Label>Şifremi Unuttum</Form.Label>
          <Button type="button" onClick={handleLogin} className="form-btn">
            Giriş
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Login;
