import React, { forwardRef } from 'react';

type Props = {
    onFileSelect: (files: File[]) => void; // Seçilen dosyaları üst bileşene geri gönderir
    fileType?: string; // Kabul edilen dosya türleri
    multiple?: boolean; // Birden fazla dosya seçimine izin verir
};

const CustomFileInput = forwardRef<HTMLInputElement, Props>(({ onFileSelect, fileType = 'image/*', multiple = true }, ref) => {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const filesArray = Array.from(files);
            onFileSelect(filesArray); // Seçilen dosyaları üst bileşene gönder
        }
    };

    return (
        <div>
            <input
                type='file'
                ref={ref}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept={fileType}
                multiple={multiple}
            />
        </div>
    );
});

export default CustomFileInput;
