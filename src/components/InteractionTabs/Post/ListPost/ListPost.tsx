import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import "./listPost.css"
import IconTemp from '../../../../utilities/Helpers/iconTemp'
import { commentIcon, heartIcon, sendIcon } from '../../../../utilities/Constants/iconsList'
import { getUserId } from '../../../../services/identityService'
import { useDispatch, useSelector } from 'react-redux'
import { addPostComment, getPostsBySchoolIdClassIdBranchId } from '../../../../store/post/postSlice'
import { AppDispatch, RootState } from '../../../../store/configureStore'
import { getUserDetailById } from '../../../../store/user/userSlice'
import FormattedDate from '../../../../utilities/Helpers/formattedDate'

const ListPost = () => {
    const userId = getUserId();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.items);
    const posts = useSelector((state: RootState) => state.post.posts);

    const [comments, setComments] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        if (userId) {
            dispatch(getUserDetailById(userId));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (user && user.schoolId && user.classroomId && user.branchId) {
            dispatch(getPostsBySchoolIdClassIdBranchId({ schoolId: user?.schoolId, classId: user?.classroomId, branchId: user?.branchId }));
        }
    }, [dispatch, user, posts]);

    const createPostComment = async (postId: number) => {
        const formData = {
            userId: userId || "",
            taggedUserId: [],
            postId: postId,
            comment: comments[postId] || ''
        }
        try {
            await dispatch(addPostComment(formData));
            console.log(formData);
            setComments((prevComments) => ({
                ...prevComments,
                [postId]: '',
            }));
        } catch (error) {
            console.log("An error occurred while adding the post comment.", error);
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, postId: number) => {
        const { name, value } = e.target;
        setComments((prevComments) => ({
            ...prevComments,
            [postId]: value
        }))
    }
    return (
        <>
            {posts && posts.posts.length > 0 ? (
                posts.posts.map(post => (
                    <Card key={post.postId}>
                        <Card.Body >
                            <Row className="align-items-center">
                                <Col xs="auto">
                                    <img src={post.imageUrl} className="rounded-circle post-img me-2"
                                    />
                                </Col>
                                <Col>
                                    <div className='post-label-container'>
                                        <span className="mb-0">{post.firstName} {post.lastName}</span>
                                        <div className='post-label'>
                                            <span className="text-muted">
                                                <FormattedDate date={post.createdDate} /> </span>
                                            <span className="text-muted"> -  {user?.classroomName}.Sınıf / {user?.branchName} Şubesi</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Card.Text className='post-text'>{post.message}</Card.Text>
                            <img src='https://media.istockphoto.com/id/1318858332/tr/foto%C4%9Fraf/ofiste-poz-veren-g%C3%BCl%C3%BCmseyen-kad%C4%B1n-%C3%A7al%C4%B1%C5%9Fan%C4%B1n-vesikal%C4%B1k-portresi.jpg?s=1024x1024&w=is&k=20&c=9fZmmIVi9BzG2-Bk3VEoyPqqYp0G-bZP9W7qtAY7V_w=' className="card-img-bottom" />
                        </Card.Body >
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
                                    <div className="comment-input-container">
                                        <Form onSubmit={(e) => {
                                            e.preventDefault();
                                            createPostComment(post.postId);
                                        }}>
                                            <Form.Control className='commentTextArea' type="text" placeholder='Yorumunuzu yazabilirsiniz..' name='comment'
                                                value={comments[post.postId] || ''}
                                                onChange={(e: any) => handleChange(e, post.postId)}
                                            />
                                            <Button type="submit" className='icon-button'>
                                                <IconTemp mainClassName='btn' {...sendIcon} />
                                            </Button>
                                        </Form>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </ Card>
                ))
            ) : (
                <p>No posts available.</p>
                // Ayarla gösterecek post yok resmi çıksın
            )}

        </>
    )
}

export default ListPost


// 10 tane post getiriyor onu ayarla 
// poslar son eklenene göre gelsin
// yorumlar kısmını almadan postu maple
//sen btonu hoverı kapat
//yorumu yapar yapmaz sayfada göstersin
//created Date 2 saat geri onu ayarla