import { Card, Col, Container, Row, Table } from "react-bootstrap";
import "./home.css";
import Chart from "../../utilities/Helpers/chart";
import userService from "../../services/userService";
import { useEffect } from "react";
import { getUserId } from "../../services/identityService";
import { getUserDetailById, setUser } from "../../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/configureStore";
import CreateMessage from "../../components/CreateMessage/CreateMessage";

const Home = () => {
  const userId = getUserId();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.items);

  useEffect(() => {
    if (userId) {
      dispatch(getUserDetailById(userId));
    }
  }, [dispatch, userId]);

  const fetchUserInformation = async () => {
    try {
      if (userId) {
        const certificate = await userService.getStudentCertificate(userId);
        const userData = {
          // ...response.data,
          certificate: certificate.data,
        };
        dispatch(setUser(userData));

        console.log("userData", userData);

      }
    } catch (error) {
      console.error("Veri alınamadı:", error);
    }
  };

  useEffect(() => {
    fetchUserInformation();
  }, [dispatch, userId]);
  return (
    <Container>
      <Card className="home-card">
        <div className="home-card-items">
          <span className="home-card-msg">
            HOŞGELDİN{" "}
            {user &&
              user.firstName &&
              user.firstName.toLocaleUpperCase("tr-TR")}
          </span>
          <img src={user?.imageUrl} className="img-fluid rounded" />
          <span>{user?.classroomName} / {user?.branchName} - {user?.studentNo}</span>
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
      <CreateMessage />
      <Card className="book-information">Okuduğu kitaplar</Card>
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

          {/* {user && user.certificate.certificates && user.certificate.certificates.length > 0 && (
            <tbody>
              {user.certificate.certificates.map((cert: any) => (
                <tr key={cert.id}>
                  <td>{cert.classroomName}</td>
                  <td>{cert.year}</td>
                  <td>{cert.certificateName}</td>
                  <td>{cert.certificateName}</td>
                </tr>
              ))}
            </tbody>
          )} */}

          {/* <tr>
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
            </tr> */}
        </Table>
      </div>
      <Chart></Chart>
    </Container>
  );
};

export default Home;
