import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/configureStore';
import { addPostComment } from '../../../../store/post/postSlice';
import { StudentInformationResponse } from '../../../../models/responses/studentInformationResponse';
import { getStudentsBySchoolIdClassIdBranchId } from '../../../../store/student/studentSlice';
import IconTemp from '../../../../utilities/Helpers/iconTemp';
import { sendIcon } from '../../../../utilities/Constants/iconsList';
import "./commentPost.css"
import ListCommentPost from '../ListCommentPost/ListCommentPost';
type Props = {
    userId: string | null,
    user: StudentInformationResponse | null,
    postId: number
}

const CommentPost = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const students = useSelector((state: RootState) => state.student.students);

    const [mentionList, setMentionList] = useState<string[]>([]); // 1. Öğrenci isimlerini tutmak için durum
    const [showMentionList, setShowMentionList] = useState<boolean>(false); // 2. Etiketleme listesini göstermek için durum
    const [comments, setComments] = useState<{ [key: number]: string }>({});


    const createPostComment = async (postId: number) => {
        const formData = {
            userId: props.userId || "",
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
        if (value.endsWith('@') && props.user) { // '@' işaretinin yazıldığı an
            setShowMentionList(true);
            dispatch(getStudentsBySchoolIdClassIdBranchId({
                schoolId: props.user.schoolId,
                classId: props.user.classroomId,
                branchId: props.user.branchId
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
    return (
        <Row className='comment-row mb-3'>
            <Col xs={1}>
                <img src={props.user?.imageUrl} className="rounded-circle comment-img me-2" />
            </Col>
            <Col>
                <div className="comment-input-container">
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        createPostComment(props.postId);
                    }}>
                        <Form.Control
                            className='commentTextArea'
                            type="text"
                            placeholder='Yorumunuzu yazabilirsiniz..'
                            name='comment'
                            value={comments[props.postId] || ''}
                            onChange={(e) => handleChange(e, props.postId)}
                        />
                        {showMentionList && (
                            <div className="mention-list">
                                {mentionList.map((mention, index) => (
                                    <div
                                        key={index}
                                        className="mention-item"
                                        onClick={() => handleMentionSelect(mention, props.postId)}
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
                <ListCommentPost />
            </Col>
        </Row>
    )
}

export default CommentPost