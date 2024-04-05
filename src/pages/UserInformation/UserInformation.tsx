import { Card, Col, Container, Row, Table } from "react-bootstrap";
import "./userInformation.css";
import Chart from "../../utilities/Helpers/chart";

const UserInformation = () => {
  return (
    <Container>
      <Card className="home-card">
        <div className="home-card-items">
          <span className="home-card-msg">HOŞGELDİN İSİM</span>
          <img
            src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
            className="img-fluid rounded"
          />
          <span>sınıf adı / şube - no</span>
        </div>
        <Container className="user-information-container">
          <Row>
            <Col>
              <div className="user-information">
                <div className="circle">
                  <span className="value">2</span>
                </div>
                <div className="text">
                  <span>Okuduğu Kitaplar</span>
                </div>
              </div>
            </Col>
            <Col>
              <div className="user-information">
                <div className="circle">
                  <span className="value">3</span>
                </div>
                <div className="text">
                  <span>Yeni Kitaplar</span>
                </div>
              </div>
            </Col>
            <Col>
              <div className="user-information">
                <div className="circle">
                  <span className="value">3</span>
                </div>
                <div className="text">
                  <span>Yeni Kitaplar</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Card>
      <Card className="book-information">mflskm</Card>
      <div className="certificate">
        <Table striped bordered hover>
          <thead>
            <tr>
              {/* kaç sınıf varsa ona göre döndür ilerde verileri / sıralamayı da yeniden eskiye göre yap 8. sınıf en yukarda olsun */}
              <th>Sınıf</th>
              <th>Öğrenim Yılı</th>
              <th>1. Dönem</th>
              <th>2. Dönem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>5. Sınıf</td>
              <td>2023-2024</td>
              <td>Teşekkür Belgesi</td>
              <td>Teşekkür Belgesi</td>
            </tr>
            <tr>
              <td>6. Sınıf</td>
              <td>2023-2024</td>
              <td>Teşekkür Belgesi</td>
              <td>Teşekkür Belgesi</td>
            </tr>
            <tr>
              <td>7. Sınıf</td>
              <td>2023-2024</td>
              <td>Teşekkür Belgesi</td>
              <td>Teşekkür Belgesi</td>
            </tr>
            <tr>
              <td>8. Sınıf</td>
              <td>2023-2024</td>
              <td>Teşekkür Belgesi</td>
              <td>Teşekkür Belgesi</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <Chart></Chart>
    </Container>
  );
};

export default UserInformation;
