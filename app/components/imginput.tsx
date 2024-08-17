import { useState } from 'react';

interface ImgInputProps {
    setImage: (url: string) => void;
}

const ImgInput = (props: ImgInputProps) => {
    const [imageFile, setImageFile] = useState<string | File>('');

    const handleClick = async () => {
        try {
            const data = new FormData();
            data.append('file', imageFile);
            data.append('upload_preset', 'kem2ktzi');
            data.append('cloud_name', 'dtnfyravs');
            const response = await fetch('https://api.cloudinary.com/v1_1/dtnfyravs/image/upload', {
                method: 'POST',
                body: data,
            });
            const jsonData = await response.json();
            await props.setImage(jsonData.url);
            alert('画像アップロード成功');
        } catch (err) {
            alert('画像アップロード失敗');
        }
    };

    const imageFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setImageFile(e.target.files[0]);
    };

    return (
        <div className="img-input">
            <input
                type="file"
                onChange={imageFileHandler}
                accept="image/png, image/jpg"
            />
            <button
                onClick={handleClick}
                disabled={!imageFile}>
                画像Upload
            </button>
        </div>
    );
};

export default ImgInput;
