import { Card, Col, Container, Row, Table } from "react-bootstrap";
import "./examDate.css";

type Props = {};

const AddStudent = (props: Props) => {
    return (
        <>
            <Container>
                <Row>
                    <Col lg={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title> Sınav ve Proje Tarihleri</Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Ders Adı</th>
                                            <th>Tür</th>
                                            <th>Tarih</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Arapça</td>
                                            <td>1. Proje</td>
                                            <td>16/05/2024</td>
                                        </tr>
                                        <tr>
                                            <td>Matematik</td>
                                            <td>1. Sınav</td>
                                            <td>16/05/2024</td>
                                        </tr>
                                        <tr>
                                            <td>Fizik</td>
                                            <td>2. Sınav</td>
                                            <td>16/05/2024</td>
                                        </tr>
                                    </tbody>

                                </Table>
                            </Card.Body>
                        </Card>

                    </Col>
                    <Col lg={6}>
                        <Card>
                            <Card.Body>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Ders Adı</th>
                                            <th>Tür</th>
                                            <th>Konu</th>
                                            <th>Son Teslim Tarihi</th>
                                            <th>Durumu</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Matematik</td>
                                            <td>Proje</td>
                                            <td>50 soru</td>
                                            <td>16/05/2024</td>
                                            <td>Teslim Edilmedi</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>

                        </Card>
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default AddStudent;