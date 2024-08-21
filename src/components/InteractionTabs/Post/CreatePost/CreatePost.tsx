import React, { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import './createPost.css'
import { AppDispatch, RootState } from '../../../../store/configureStore';
import { getUserId } from '../../../../services/identityService';
import { addPost } from '../../../../store/post/postSlice';
import { getUserDetailById } from '../../../../store/user/userSlice';
import IconTemp from '../../../../utilities/Helpers/iconTemp';
import { upload } from '../../../../utilities/Constants/iconsList';
import { uploadToCloudinary } from '../../../../utilities/Helpers/cloudinary';

type Props = {}

const CreatePost = (props: Props) => {
    const userId = getUserId();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.items);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        userId: userId || "",
        schoolId: 0,
        classroomId: 0,
        branchId: 0,
        likeCount: 0,
        message: "",
        isCommentable: true,
        filePath: [] as string[]
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


    // const createPost = async (e: React.FormEvent) => {
    //     e.preventDefault(); // Formun varsayılan gönderimini engelleyin
    //     try {
    //         await dispatch(addPost(formData));
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             message: "",
    //             filePath: []
    //         }));
    //         console.log(formData);
    //     } catch (error) {
    //         console.log("An error occurred while adding the post.", error);

    //     }
    // }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFileUrls = Array.from(files).map(file => URL.createObjectURL(file));
            // const newFileUrls = await Promise.all(
            //     Array.from(files).map(file => uploadToCloudinary(file)));
            setFormData((prevData) => ({
                ...prevData,
                filePath: [...prevData.filePath, ...newFileUrls]
            }))
        }
    }

    //fix
    //yorum olmadan paylaşa basınca resmi Cloudinary'ye gönderemesin
    const createPost = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Yüklenen dosyaları Cloudinary'ye gönder ve URL'leri al
            const blobs = formData.filePath.map(path => fetch(path).then(res => res.blob()));
            const blobsArray = await Promise.all(blobs);
            const uploadedFileUrls = await Promise.all(
                blobsArray.map(blob => uploadToCloudinary(blob))
            );

            // Form verilerini güncelle
            const postData = {
                ...formData,
                filePath: uploadedFileUrls
            };

            await dispatch(addPost(postData));
            setFormData((prevData) => ({
                ...prevData,
                message: "",
                filePath: []
            }));
        } catch (error) {
            console.error("An error occurred while adding the post:", error);
        }
    };

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

                {formData.filePath.length > 0 && (
                    <div className='uploaded-image-container'>
                        {formData.filePath.map((path, index) => (
                            <img key={index} src={path} className="selected-image" />
                        ))}
                    </div>
                )}

                <div className='icon-checkbox-container'>
                    <button className='btn-with-icon' onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                        <IconTemp mainClassName='file-upload' {...upload} />
                    </button>
                    <input type='file'
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        accept="image/*" //only image
                        multiple
                    />
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
        </Form >
    )
}

export default CreatePost

