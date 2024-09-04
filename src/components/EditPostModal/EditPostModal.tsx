import React, { useRef, useState } from 'react'
import { useFormik } from "formik";
import { Modal } from 'react-bootstrap';
import "./editPostModal.css";
import IconTemp from '../../utilities/Helpers/iconTemp';
import { addIcon, cancelIcon } from '../../utilities/Constants/iconsList';
import CustomFileInput from '../../utilities/Helpers/CustomFileInput';
import { UpdatePostRequest } from '../../models/requests/updatePostRequest';

type Props = {
    show: boolean;
    handleClose: () => void;
    post: any;
}

const EditPostModal = (props: Props) => {
    const { id, userId, schoolId, classroomId, branchId, likeCount, message, isCommentable, filePaths } = props.post;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const formik = useFormik<UpdatePostRequest>({
        initialValues: {
            id: id,
            userId: userId,
            schoolId: schoolId,
            classroomId: classroomId,
            branchId: branchId,
            likeCount: likeCount,
            message: message,
            isCommentable: isCommentable,
            filePath: filePaths
        },
        onSubmit: values => {
            console.log(values);
        },
    });

    const handleFileSelect = (newFileUrls: string[]) => {
        // setFormData(prevData => ({
        //     ...prevData,
        //     filePath: [...prevData.filePath, ...newFileUrls] 
        // }));
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


    return (
        <form onSubmit={formik.handleSubmit}>
            <Modal show={props.show} onHide={props.handleClose} className='edit-post-modal' centered
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
                    <button type='submit'>Güncelle</button>
                    <button type='button' onClick={handleCancel}>İptal</button>
                </Modal.Footer>
            </Modal>
        </form>
    )
}

export default EditPostModal