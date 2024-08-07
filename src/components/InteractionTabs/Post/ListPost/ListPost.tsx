import React from 'react'
import { Card, Col, Form } from 'react-bootstrap'
import "./listPost.css"

const ListPost = () => {
    return (
        <Card>
            <Card.Body>
                <Form className='post-card'>
                    <img src='https://media.istockphoto.com/id/1318858332/tr/foto%C4%9Fraf/ofiste-poz-veren-g%C3%BCl%C3%BCmseyen-kad%C4%B1n-%C3%A7al%C4%B1%C5%9Fan%C4%B1n-vesikal%C4%B1k-portresi.jpg?s=1024x1024&w=is&k=20&c=9fZmmIVi9BzG2-Bk3VEoyPqqYp0G-bZP9W7qtAY7V_w=' className="img-fluid rounded-circle post-img me-2"
                    />
                    <div className='post-label-container'>
                        <Form.Label className="mb-0">Nida Kul</Form.Label>
                        <div className='post-label '>
                            <Form.Label>23 Temmuz 2024</Form.Label>
                            <Form.Label > -  3.Sınıf / B Şubesi</Form.Label>
                        </div>

                    </div>

                </Form>
            </Card.Body>
        </Card>
    )
}

export default ListPost 