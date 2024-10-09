import React, { useEffect, useState } from 'react'
import { Card, Col, Dropdown, Row } from 'react-bootstrap'
import "./listPost.css"
import IconTemp from '../../../../utilities/Helpers/iconTemp'
import { commentIcon, heartIcon, pointsIcon } from '../../../../utilities/Constants/iconsList'
import { getUserId } from '../../../../services/identityService'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsBySchoolIdClassIdBranchId } from '../../../../store/post/postSlice'
import { AppDispatch, RootState } from '../../../../store/configureStore'
import { getUserDetailById } from '../../../../store/user/userSlice'
import FormattedDate from '../../../../utilities/Helpers/formattedDate'
import postService from '../../../../services/postService'
import EditPostModal from '../../../EditPostModal/EditPostModal'
import { getStudentsBySchoolIdClassIdBranchId } from '../../../../store/student/studentSlice'
import CommentPost from '../CommentPost/CommentPost'


const ListPost = () => {
    const userId = getUserId();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);
    const posts = useSelector((state: RootState) => state.post.posts);

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        if (userId) {
            dispatch(getUserDetailById(userId));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (user && user.schoolId && user.classroomId && user.branchId) {
            dispatch(getPostsBySchoolIdClassIdBranchId({ schoolId: user?.schoolId, classId: user?.classroomId, branchId: user?.branchId }));
            dispatch(getStudentsBySchoolIdClassIdBranchId({ schoolId: user?.schoolId, classId: user?.classroomId, branchId: user?.branchId }));
        }
    }, [dispatch, user, posts]);

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
                                    <Dropdown.Item as="button" onClick={handleShow}>
                                        Düzenle
                                    </Dropdown.Item>
                                    <EditPostModal show={show} handleClose={handleClose} post={post} user={user} />
                                    <Dropdown.Item as="button" onClick={() => handleDelete(post.postId)}>
                                        Sil
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
                                {post.message}
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
                                <CommentPost userId={userId} user={user} postId={post.postId} />
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
// yorumlar kısmını almadan postu maple
//sent btonu hoverı kapat. css ayarlmasını yap güzelce
//yorumu yapar yapmaz sayfada göstersin
//created Date 2 saat geri onu ayarla
//iconların byutlarını azalt
//postu düzenle sil alanı oluştur