import React, { useRef, useState } from 'react'
import { useFormik } from "formik";
import { Button, Modal } from 'react-bootstrap';
import "./editPostModal.css";
import IconTemp from '../../utilities/Helpers/iconTemp';
import { addIcon, cancelIcon } from '../../utilities/Constants/iconsList';
import CustomFileInput from '../../utilities/Helpers/CustomFileInput';
import { UpdatePostRequest } from '../../models/requests/updatePostRequest';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { updatePost } from '../../store/post/postSlice';
import { uploadToCloudinary } from '../../utilities/Helpers/cloudinary';

type Props = {
    show: boolean;
    handleClose: () => void;
    post: any;
    user: any;
}

const EditPostModal = (props: Props) => {
    const { postId, userId, likeCount, message, isCommentable, filePaths } = props.post;
    const { schoolId, classroomId, branchId } = props.user;

    const fileInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch<AppDispatch>();

    const [newFileUrls, setNewFileUrls] = useState<string[]>([]);

    const formik = useFormik<UpdatePostRequest>({
        initialValues: {
            id: postId,
            userId: userId,
            schoolId: schoolId,
            classroomId: classroomId,
            branchId: branchId,
            likeCount: likeCount,
            message: message,
            isCommentable: isCommentable,
            filePath: filePaths
        },
        onSubmit: async (values) => {
            console.log("Formik onSubmit triggered with values:", values);
            try {
                await dispatch(updatePost(values));
                props.handleClose();
            } catch (error) {
                console.error("Post güncellenirken bir hata oluştu:", error);
            }
        },
    });

    const handleFileSelect = (fileUrls: string[]) => {
        formik.setFieldValue('filePath', [...formik.values.filePath, ...fileUrls]);
    };

    const handleRemoveImage = (index: number) => {
        const newFilePath = [...formik.values.filePath];
        newFilePath.splice(index, 1);
        formik.setFieldValue('filePath', newFilePath);
    };

    const handleCancel = () => {
        formik.resetForm();
        props.handleClose();
    };

    const handleSubmit = () => {
        formik.handleSubmit();
    };
    return (
        <form>
            <Modal show={props.show} onHide={handleCancel} className='edit-post-modal' centered
            >
                <Modal.Header closeButton>Gönderiyi Düzenle</Modal.Header>
                <Modal.Body className='edit-body-container'>
                    <div>
                        <>
                            <input type='text' id='post-message'
                                name='message'
                                value={formik.values.message}
                                onChange={formik.handleChange}
                            />
                            <div className='edit-files-container'>
                                {formik.values.filePath?.map((filePathItem: any, index: number) => (
                                    <div key={index} className='edit-image-container'>
                                        <img src={filePathItem}
                                            className='edit-files' />
                                        <button className='btn-with-icon close-button' onClick={() => handleRemoveImage(index)}>
                                            <IconTemp {...cancelIcon} />
                                        </button>
                                    </div>
                                ))}
                                {/* fileInputRef.current.click() => open file selector */}
                                <button className='btn-with-icon add-button' onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                                    <IconTemp {...addIcon} />
                                </button>
                                <CustomFileInput
                                    onFileSelect={handleFileSelect}
                                    ref={fileInputRef} />
                            </div>
                        </>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type='button' onClick={handleSubmit}>Güncelle</Button>
                    <Button type='button' onClick={handleCancel}>İptal</Button>
                </Modal.Footer>
            </Modal>
        </form>
    )
}

export default EditPostModal 