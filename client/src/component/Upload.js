import React, { useState } from "react";
import axios from "axios";

const UploadComp = () => {
    const [uploadData, setUploadData] = useState("");

    /** 이미지 파일 업로드 */
    const fileImgUpload = (event) => {
        const getImgs = event.target.files; // 사용자가 업로드한 사진
        const uploadImgs = new FormData(); // 서버에 보낼 폼 생성

        // 파일을 생성한 폼에 추가
        for(let cnt = 0; cnt < getImgs.length ; cnt++){
            uploadImgs.append("imgFile", getImgs[cnt]);
        }   

        setUploadData(uploadImgs); // 업로드할 데이터 변경
    }

    /** 비디오 파일 업로드 */
    const fileVideoUpload = (event) => {
        const getVideo = event.target.files[0]; // 사용자가 업로드한 영상
        const uploadVideo = new FormData(); // 서버에 보낼 폼 생성
        uploadVideo.append("imgFile", getVideo);

        setUploadData(uploadVideo); // 업로드할 데이터 변경
    }

    /** 서버로 파일 전송 */
    const uploadServer = async () => {
        const response = await axios.post("http://localhost:8000/",uploadData,{headers: {
            'Content-Type': 'multipart/form-data'
          }})
        console.log(response)
    }
    return(
        <>
            <input type="file" accept="image/jpeg" multiple={true} onChange={fileImgUpload}/>
            <input type="file" accept="video/mp4, video/mkv" onChange={fileVideoUpload}/>
            <button onClick={uploadServer}>hello world</button>
        </>
    )
}

export default UploadComp