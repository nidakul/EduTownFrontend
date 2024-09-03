import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap'
import "./listPost.css"
import IconTemp from '../../../../utilities/Helpers/iconTemp'
import { commentIcon, heartIcon, pointsIcon, sendIcon } from '../../../../utilities/Constants/iconsList'
import { getUserId } from '../../../../services/identityService'
import { useDispatch, useSelector } from 'react-redux'
import { addPostComment, getPostsBySchoolIdClassIdBranchId } from '../../../../store/post/postSlice'
import { AppDispatch, RootState } from '../../../../store/configureStore'
import { getUserDetailById } from '../../../../store/user/userSlice'
import FormattedDate from '../../../../utilities/Helpers/formattedDate'
import postService from '../../../../services/postService'
import { useFormik } from "formik";


const ListPost = () => {
    const userId = getUserId();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);
    const posts = useSelector((state: RootState) => state.post.posts);

    const [comments, setComments] = useState<{ [key: number]: string }>({});
    const [editablePost, setEditablePost] = useState<boolean>(false);

    useEffect(() => {
        if (userId) {
            dispatch(getUserDetailById(userId));
        }
    }, [dispatch, userId]);

    // const fetchPosts = async () => {
    //     try {
    //         if (user && user.schoolId && user.classroomId && user.branchId) {
    //             dispatch(getPostsBySchoolIdClassIdBranchId({ schoolId: user?.schoolId, classId: user?.classroomId, branchId: user?.branchId }));
    //         }
    //     } catch (error) {
    //         console.error("API isteği sırasında bir hata oluştu:", error);
    //     }
    // }


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
        const { value } = e.target;
        setComments((prevComments) => ({
            ...prevComments,
            [postId]: value
        }))
    }


    const handleDelete = async (postId: number) => {
        try {
            const response = await postService.deletePost(postId);
            console.log("Post delete operation successful", postId);
            // fetchPosts();
            return response;
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }

    return (
        <>
            {posts && posts.posts.length > 0 ? (
                posts.posts.map(post => (
                    <Card key={post.postId}>
                        <Card.Body>
                            <Dropdown>
                                <Dropdown.Toggle as="div" id="dropdown-custom-components">
                                    <IconTemp {...pointsIcon} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item as="button" onClick={() => setEditablePost(true)}>Düzenle</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={() => handleDelete(post.postId)}>Sil
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

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

                            <Card.Text className='post-text'>
                                {editablePost ? (
                                    <form>
                                        <input type='text' id='post-message'
                                            value={post.message}>
                                        </input>
                                    </form>
                                ) : (
                                    post.message
                                )
                                }
                            </Card.Text>
                            <div className='post-files'>
                                {post.filePaths.map((filePath, index) => (
                                    <img key={index} src={filePath} className="card-img-bottom" />
                                ))}
                            </div>

                        </Card.Body >
                        <Card.Footer>
                            <div className='post-footer-container'>
                                <IconTemp {...heartIcon} />
                                {post.isCommentable && <IconTemp {...commentIcon} />}
                            </div>
                            {post.isCommentable &&
                                <Row className='comment-row mb-3'>
                                    <Col xs={1}>
                                        <img src={user?.imageUrl} className="rounded-circle comment-img me-2" />
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
                            }
                        </Card.Footer>
                    </ Card >
                ))
            ) : (
                <p>Henüz paylaşılan bir gönderi yok</p>
            )}

        </>
    )
}

export default ListPost


// 10 tane post getiriyor onu ayarla 
// poslar son eklenene göre gelsin
// yorumlar kısmını almadan postu maple
//sent btonu hoverı kapat. css ayarlmasını yap güzelce
//yorumu yapar yapmaz sayfada göstersin
//created Date 2 saat geri onu ayarla
//iconların byutlarını azalt
//postu düzenle sil alanı oluştur