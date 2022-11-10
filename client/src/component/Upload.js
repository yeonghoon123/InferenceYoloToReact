import React, { useState } from "react";
import axios from "axios";

const UploadComp = ({props : {setSrcBase64Data, setUploadFileType}}) => {
    const [uploadData, setUploadData] = useState("");
    const [test, setTest] = useState([]);

    const encodeFileToBase64 = (fileBlob) => {
        const fileReader = new FileReader();
        fileReader.onload =  () => {
            console.log(fileReader)
            setSrcBase64Data((orginData) => {
                return [...orginData, {base64URL : fileReader.result }];
            });
          };

        fileReader.readAsDataURL(fileBlob);
    
    }

    /** 이미지/비디오 업로드 */
    const fileUpload = (event, fileType) => {
        const getFile = event.target.files; // 사용자가 업로드한 사진
        const uploadFile = new FormData(); // 서버에 보낼 폼 생성

        // 파일을 생성한 폼에 추가
        for(let cnt = 0; cnt < getFile.length ; cnt++){
            uploadFile.append("uploadFile", getFile[cnt]);
            encodeFileToBase64(getFile[cnt]);
        }  

        setUploadFileType(fileType)
        setUploadData(uploadFile); // 업로드할 데이터 변경
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
            <input type="file" accept="image/jpeg" multiple={true} onChange={ (event) => fileUpload(event, "img")}/>
            <input type="file" accept="video/mp4, video/mkv" onChange={(event) => fileUpload(event, "video")}/>
            <button onClick={uploadServer}>Inference</button>
        </>
    )
}

export default UploadComp