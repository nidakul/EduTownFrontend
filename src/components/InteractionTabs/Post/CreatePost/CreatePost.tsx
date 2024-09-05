import React, { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import './createPost.css'
import { AppDispatch, RootState } from '../../../../store/configureStore';
import { getUserId } from '../../../../services/identityService';
import { addPost } from '../../../../store/post/postSlice';
import { getUserDetailById } from '../../../../store/user/userSlice';
import IconTemp from '../../../../utilities/Helpers/iconTemp';
import { cancelIcon, upload } from '../../../../utilities/Constants/iconsList';
import { uploadToCloudinary } from '../../../../utilities/Helpers/cloudinary';
import CustomFileInput from '../../../../utilities/Helpers/CustomFileInput';

type Props = {}

const CreatePost = (props: Props) => {
    const userId = getUserId();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [filePreviews, setFilePreviews] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        userId: userId || "",
        schoolId: 0,
        classroomId: 0,
        branchId: 0,
        likeCount: 0,
        message: "",
        isCommentable: true,
        filePath: [] as File[]
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

    // const handleFileSelect = (newFileUrls: string[]) => {
    //     setFormData(prevData => ({
    //         ...prevData,
    //         filePath: [...prevData.filePath, ...newFileUrls]
    //     }));
    // };

    const handleFileSelect = (files: File[]) => {
        const newFilePreviews = files.map(file => URL.createObjectURL(file));
        setFilePreviews(prevFiles => [...prevFiles, ...newFilePreviews]);
        setFormData(prevData => ({
            ...prevData,
            filePath: [...prevData.filePath, ...files]
        }));
    };

    //fix
    //yorum olmadan paylaşa basınca resmi Cloudinary'ye gönderemesin
    // const createPost = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         // Yüklenen dosyaları Cloudinary'ye gönder ve URL'leri al
    //         const blobs = formData.filePath.map(path => fetch(path).then(res => res.blob()));
    //         const blobsArray = await Promise.all(blobs);
    //         const uploadedFileUrls = await Promise.all(
    //             blobsArray.map(blob => uploadToCloudinary(blob))
    //         );

    //         // Form verilerini güncelle
    //         const postData = {
    //             ...formData,
    //             filePath: uploadedFileUrls
    //         };

    //         await dispatch(addPost(postData));
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             message: "",
    //             filePath: []
    //         }));
    //     } catch (error) {
    //         console.error("An error occurred while adding the post:", error);
    //     }
    // };

    const createPost = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Dosyaları Cloudinary'ye gönder
            const uploadedFileUrls = await Promise.all(
                Array.from(formData.filePath).map(file => uploadToCloudinary(file)) // `File` nesnelerini Cloudinary'ye yükleyin
            );

            // Form verilerini güncelle
            const postData = {
                ...formData,
                filePath: uploadedFileUrls // Cloudinary'den dönen URL'ler `string[]` olarak
            };

            await dispatch(addPost(postData));
            setFormData(prevData => ({
                ...prevData,
                message: "",
                filePath: [] // Dosyaları temizleyin
            }));
            setFilePreviews([]); // Önizleme URL'lerini temizleyin
        } catch (error) {
            console.error("Gönderi oluşturulurken bir hata oluştu:", error);
        }
    };


    // const handleRemoveImage = (index: number) => {
    //     setFormData((prevData) => {
    //         const newFilePath = [...prevData.filePath];
    //         newFilePath.splice(index, 1);
    //         return { ...prevData, filePath: newFilePath };
    //     });
    // }
    const handleRemoveImage = (index: number) => {
        setFilePreviews(prevPreviews => {
            // Önce, önizleme dizisini güncelle
            const newPreviews = [...prevPreviews];
            newPreviews.splice(index, 1);
            return newPreviews;
        });

        setFormData(prevData => {
            // Dosya dizisini güncelle
            const newFiles = [...prevData.filePath];
            newFiles.splice(index, 1);
            return {
                ...prevData,
                filePath: newFiles // Burada dosyaların güncellenmiş listesini döndürüyoruz
            };
        });
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

                {filePreviews.length > 0 && (
                    <div className='uploaded-image-container'>
                        {filePreviews.map((preview, index) => (
                            <div key={index} className='selected-image-container'>
                                <img src={preview} className="selected-image" />
                                <button className='close-button btn-with-icon' onClick={() => handleRemoveImage(index)}>
                                    <IconTemp {...cancelIcon} />
                                </button>
                            </div>

                        ))}
                    </div>
                )}

                <div className='icon-checkbox-container'>
                    <button
                        type="button"
                        className='btn-with-icon'
                        onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                        <IconTemp mainClassName='file-upload' {...upload} />
                    </button>
                    <CustomFileInput
                        onFileSelect={handleFileSelect}
                        ref={fileInputRef}
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

