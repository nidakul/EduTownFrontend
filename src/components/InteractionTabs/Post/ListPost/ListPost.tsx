import React from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import "./listPost.css"
import IconTemp from '../../../../utilities/Helpers/iconTemp'
import { commentIcon, heartIcon } from '../../../../utilities/Constants/iconsList'

const ListPost = () => {
    return (
        <Card>
            <Card.Body>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <img src='https://media.istockphoto.com/id/1318858332/tr/foto%C4%9Fraf/ofiste-poz-veren-g%C3%BCl%C3%BCmseyen-kad%C4%B1n-%C3%A7al%C4%B1%C5%9Fan%C4%B1n-vesikal%C4%B1k-portresi.jpg?s=1024x1024&w=is&k=20&c=9fZmmIVi9BzG2-Bk3VEoyPqqYp0G-bZP9W7qtAY7V_w=' className="rounded-circle post-img me-2"
                        />
                    </Col>
                    <Col>
                        <div className='post-label-container'>
                            <span className="mb-0">Nida Kul</span>
                            <div className='post-label'>
                                <span className="text-muted">23 Temmuz 2024</span>
                                {/* <Form.Label > -  3.Sınıf / B Şubesi</Form.Label> */}
                            </div>
                        </div>
                    </Col>
                </Row>
                <Card.Text className='post-text'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At similique quisquam quaerat aut quidem eos dolor praesentium itaque perferendis odit delectus deserunt, nihil officia voluptates iure cumque voluptatibus tenetur. Quo nulla culpa id accusamus ad labore accusantium illum dolorum, fuga sit voluptas dolor recusandae, minus omnis perspiciatis cumque quos, in harum doloremque assumenda voluptatum rem quaerat ipsum? Qui, beatae nesciunt?</Card.Text>
                <img src='https://media.istockphoto.com/id/1318858332/tr/foto%C4%9Fraf/ofiste-poz-veren-g%C3%BCl%C3%BCmseyen-kad%C4%B1n-%C3%A7al%C4%B1%C5%9Fan%C4%B1n-vesikal%C4%B1k-portresi.jpg?s=1024x1024&w=is&k=20&c=9fZmmIVi9BzG2-Bk3VEoyPqqYp0G-bZP9W7qtAY7V_w=' className="card-img-bottom" />
            </Card.Body>
            <Card.Footer>
                <div className='post-footer-container'>
                    <IconTemp {...heartIcon} />
                    <IconTemp {...commentIcon} />
                </div>
                <Row className='comment-row mb-3'>
                    <Col xs={1}>
                        <img src='https://media.istockphoto.com/id/1318858332/tr/foto%C4%9Fraf/ofiste-poz-veren-g%C3%BCl%C3%BCmseyen-kad%C4%B1n-%C3%A7al%C4%B1%C5%9Fan%C4%B1n-vesikal%C4%B1k-portresi.jpg?s=1024x1024&w=is&k=20&c=9fZmmIVi9BzG2-Bk3VEoyPqqYp0G-bZP9W7qtAY7V_w=' className="rounded-circle comment-img me-2" />
                    </Col>
                    <Col>
                        <Form>
                            <Form.Group controlId='commentTextArea'>
                                <Form.Control className='commentTextArea' type="text" placeholder='Yorumunuzu yazabilirsiniz..' name='comment'>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Card.Footer>
        </Card >
    )
}

export default ListPost 