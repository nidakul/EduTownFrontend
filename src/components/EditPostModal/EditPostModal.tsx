import React, { useRef, useState } from 'react'
import { Modal } from 'react-bootstrap';
import "./editPostModal.css";
import IconTemp from '../../utilities/Helpers/iconTemp';
import { addIcon, cancelIcon } from '../../utilities/Constants/iconsList';
import CustomFileInput from '../../utilities/Helpers/CustomFileInput';

type Props = {
    show: boolean;
    handleClose: () => void;
    postMessage: string;
    imgUrl?: string[];
}

const EditPostModal = (props: Props) => {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (newFileUrls: string[]) => {
        // setFormData(prevData => ({
        //     ...prevData,
        //     filePath: [...prevData.filePath, ...newFileUrls]
        // }));
    };
    return (
        <form>
            <Modal show={props.show} onHide={props.handleClose} className='edit-post-modal' centered
            >
                <Modal.Header closeButton>Gönderiyi Düzenle</Modal.Header>
                <Modal.Body className='edit-body-container'>
                    <div>
                        <>
                            <input type='text' id='post-message' value={props.postMessage} />
                            <div className='edit-files-container'>
                                {props.imgUrl?.map((filePath, index) => (
                                    <div className='edit-image-container'>
                                        <img key={index} src={filePath}
                                            className='edit-files' />
                                        <button className='btn-with-icon close-button'>
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
                    <button>deneme</button>
                </Modal.Footer>
            </Modal>
        </form>
    )
}

export default EditPostModal