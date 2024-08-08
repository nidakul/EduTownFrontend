import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import './createPost.css'
import { AppDispatch, RootState } from '../../../../store/configureStore';
import { getUserId } from '../../../../services/identityService';
import { addPost } from '../../../../store/post/postSlice';
import { getUserDetailById } from '../../../../store/user/userSlice';
import IconTemp from '../../../../utilities/Helpers/iconTemp';
import { upload } from '../../../../utilities/Constants/iconsList';
import ListPost from '../ListPost/ListPost';

type Props = {}

const CreatePost = (props: Props) => {
    const userId = getUserId();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.items);
    const student = useSelector((state: RootState) => state.student.items);

    const [formData, setFormData] = useState({
        userId: userId || "",
        schoolId: 0,
        classroomId: 0,
        branchId: 0,
        likeCount: 0,
        message: "",
        isCommentable: true
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            isCommentable: !e.target.checked
        }))
    }

    useEffect(() => {
        if (user) {
            setFormData((prevData) => ({
                ...prevData,
                schoolId: user.schoolId,
                classroomId: user.classroomId,
                branchId: user.branchId,
            }));
        }
    }, [user]);


    const createPost = async (e: any) => {
        e.preventDefault(); // Formun varsayılan gönderimini engelleyin
        try {
            await dispatch(addPost(formData));
            setFormData((prevData) => ({
                ...prevData,
                message: ""
            }));
            console.log(formData);
        } catch (error) {
            console.log("An error occurred while adding the post.", error);

        }
    }

    useEffect(() => {
        if (userId) {
            dispatch(getUserDetailById(userId));
        }
    }, [dispatch, userId])

    return (
        <Form onSubmit={createPost}>
            <Form.Group className="interactionTextArea-form" controlId='interactionTextArea'>
                <Form.Control className='interactionTextArea' as="textarea" placeholder='Ne paylaşmak istersin?' name='message'
                    value={formData.message}
                    onChange={handleChange}
                    rows={3} />
                <div className='icon-checkbox-container'>
                    <IconTemp mainClassName='file-upload' {...upload} />
                    <Form.Check
                        className='post-checkbox'
                        type="checkbox"
                        label="Yoruma kapalı"
                        // id={`disabled-default-${type}`}
                        onChange={handleCheckboxChange}
                    />
                </div>
                <Button className='interaction-btn form-btn-color' type="submit">PAYLAŞ</Button>
            </Form.Group>
        </Form>
    )
}

export default CreatePost

