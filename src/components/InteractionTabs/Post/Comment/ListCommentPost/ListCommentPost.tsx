import React, { useEffect } from 'react'
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap'
import "./listCommentPost.css"
import CommentPost from '../CommentPost/CommentPost';
import { StudentInformationResponse } from '../../../../../models/responses/studentInformationResponse';
import { AppDispatch, RootState } from '../../../../../store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentByPostId } from '../../../../../store/post/postSlice';

type Props = {
    userId: string | null,
    user: StudentInformationResponse | null,
    postId: number;
}

const ListCommentPost = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    // const comments = useSelector((state: RootState) => state.post.getComments); 
    const comments = useSelector((state: RootState) => state.post.getComments[props.postId] || []);
    console.log("comments", comments);
    useEffect(() => {
        const fetchComment = async () => {
            if (props.postId) {
                try {
                    await dispatch(getCommentByPostId(props.postId));
                } catch (error) {
                    console.error("Error fetching comments:", error);
                }
            }
        };

        fetchComment();
    }, [dispatch, props.postId]);

    return (
        <div className="comment-section" >
            {comments?.commenters?.length ? (
                <ListGroup>
                    {comments.commenters.map((comment) => (
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <div className="comment-author">
                                        <img
                                            src={comment.commenterImageUrl}
                                            alt="author"
                                            className="rounded-circle comment-img me-2"
                                        />
                                        {/* <span className="ms-2">{comment.commenterFirstName}</span> */}
                                    </div>
                                    <p>{comment.comment}</p>
                                </Col>
                            </Row>

                            {/* Cevap eklemek için form */}
                            <Form className="mt-2">
                                <Row>
                                    <CommentPost userId={props.userId} user={props.user} postId={props.postId} />
                                </Row>
                            </Form>

                            {/* Alt yorumları listeleme */}
                            {/* <ListGroup className="ms-4 mt-3">
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
                            </ListGroup> */}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <p>No comments available.</p>
            )}
        </div>
    );
};

export default ListCommentPost 