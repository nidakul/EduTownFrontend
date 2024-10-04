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
import EditPostModal from '../../../EditPostModal/EditPostModal'
import { getStudentsBySchoolIdClassIdBranchId } from '../../../../store/student/studentSlice'


const ListPost = () => {
    const userId = getUserId();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);
    const posts = useSelector((state: RootState) => state.post.posts);
    const students = useSelector((state: RootState) => state.student.students);

    const [comments, setComments] = useState<{ [key: number]: string }>({});
    const [show, setShow] = useState(false);

    const [mentionList, setMentionList] = useState<string[]>([]); // 1. Öğrenci isimlerini tutmak için durum
    const [showMentionList, setShowMentionList] = useState<boolean>(false); // 2. Etiketleme listesini göstermek için durum

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




    const createPostComment = async (postId: number) => {
        const formData = {
            userId: userId || "",
            taggedUserId: [], // 3. Seçilen öğrenci ID'lerini buraya ekleyebilirsiniz
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
            setMentionList([]); // Yorum gönderildiğinde etiketleme listesini temizle
            setShowMentionList(false); // Yorum gönderildiğinde etiketleme listesini gizle
        } catch (error) {
            console.log("An error occurred while adding the post comment.", error);
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLElement>, postId: number) => {
        const { value } = e.target as HTMLInputElement; // HTMLInputElement olarak türünü zorla
        setComments((prevComments) => ({
            ...prevComments,
            [postId]: value
        }));

        // '@' işareti yazıldığında öğrencileri hemen çağır
        if (value.endsWith('@') && user) { // '@' işaretinin yazıldığı an
            setShowMentionList(true);
            dispatch(getStudentsBySchoolIdClassIdBranchId({
                schoolId: user?.schoolId,
                classId: user?.classroomId,
                branchId: user?.branchId
            }));

            // Tüm öğrencileri listele
            const filteredStudents = students?.students.map(student => `${student.firstName} ${student.lastName}`);
            setMentionList(filteredStudents as string[]);
        } else if (value.includes('@')) {
            // '@' işaretinden sonra bir şeyler yazılıyorsa isimleri filtrele
            const searchTerm = value.split('@').pop()?.trim(); // Kullanıcı tarafından yazılan metin
            if (searchTerm) {
                const filteredStudents = students?.students
                    .filter(student =>
                        `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(student => `${student.firstName} ${student.lastName}`);
                setMentionList(filteredStudents as string[]);
            } else {
                setShowMentionList(false); // '@' var ama ardından hiçbir şey yoksa listeyi gizle
            }
        } else {
            setShowMentionList(false); // '@' yoksa listeyi gizle
        }
    };


    const handleMentionSelect = (mention: string, postId: number) => {
        // 5. Seçilen öğrenci ismini yorum alanına ekle
        const currentComment = comments[postId] || '';
        const newComment = currentComment.replace(/@\w*$/, `@${mention} `); // @ ile başlayan kısmı değiştir
        setComments((prevComments) => ({
            ...prevComments,
            [postId]: newComment
        }));
        setShowMentionList(false); // Seçim yapıldıktan sonra listeyi gizle
    };

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

                                                {/* <Form.Control className='commentTextArea' type="text" placeholder='Yorumunuzu yazabilirsiniz..' name='comment'
                                                    value={comments[post.postId] || ''}
                                                    onChange={(e: any) => handleChange(e, post.postId)}
                                                /> */}

                                                <Form.Control
                                                    className='commentTextArea'
                                                    type="text"
                                                    placeholder='Yorumunuzu yazabilirsiniz..'
                                                    name='comment'
                                                    value={comments[post.postId] || ''}
                                                    onChange={(e) => handleChange(e, post.postId)}
                                                />
                                                {showMentionList && (
                                                    <div className="mention-list">
                                                        {mentionList.map((mention, index) => (
                                                            <div
                                                                key={index}
                                                                className="mention-item"
                                                                onClick={() => handleMentionSelect(mention, post.postId)}
                                                            >
                                                                {mention}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

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