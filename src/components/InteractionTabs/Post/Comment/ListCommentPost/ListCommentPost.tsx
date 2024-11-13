import React from 'react'
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap'
import "./listCommentPost.css"
import CommentPost from '../CommentPost/CommentPost';
import { StudentInformationResponse } from '../../../../../models/responses/studentInformationResponse';

type Props = {
    userId: string | null,
    user: StudentInformationResponse | null,
    postId: number
}

const ListCommentPost = (props: Props) => {
    return (
        <div className="comment-section">
            <ListGroup>
                <ListGroup.Item>
                    <Row>
                        <Col>
                            <div className="comment-author">
                                <img
                                    src="https://media.istockphoto.com/id/1318858332/tr/foto%C4%9Fraf/ofiste-poz-veren-g%C3%BCl%C3%BCmseyen-kad%C4%B1n-%C3%A7al%C4%B1%C5%9Fan%C4%B1n-vesikal%C4%B1k-portresi.jpg?s=1024x1024&w=is&k=20&c=9fZmmIVi9BzG2-Bk3VEoyPqqYp0G-bZP9W7qtAY7V_w="
                                    alt="author"
                                    className="rounded-circle"
                                    style={{ width: '30px', height: '30px' }}
                                />
                                <span className="ms-2">Nida</span>
                            </div>
                            <p>text</p>
                        </Col>
                    </Row>

                    {/* Cevap eklemek için form */}
                    <Form className="mt-2">
                        <Row>
                            <CommentPost userId={props.userId} user={props.user} postId={props.postId} />
                        </Row>
                    </Form>

                    {/* Alt yorumları listeleme */}
                    <ListGroup className="ms-4 mt-3">
                        <ListGroup.Item>
                            <div className="reply-author">
                                <img
                                    src="https://media.istockphoto.com/id/1318858332/tr/foto%C4%9Fraf/ofiste-poz-veren-g%C3%BCl%C3%BCmseyen-kad%C4%B1n-%C3%A7al%C4%B1%C5%9Fan%C4%B1n-vesikal%C4%B1k-portresi.jpg?s=1024x1024&w=is&k=20&c=9fZmmIVi9BzG2-Bk3VEoyPqqYp0G-bZP9W7qtAY7V_w="
                                    alt="author"
                                    className="rounded-circle"
                                    style={{ width: '25px', height: '25px' }}
                                />
                                <span className="ms-2">cevap veren isim</span>
                            </div>
                            <p>cevap için text</p>
                        </ListGroup.Item>
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div >
    );
};

export default ListCommentPost 