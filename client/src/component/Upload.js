import React, { useState } from "react";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";

const UploadComp = ({ props: { setSrcBase64Data, setUploadFileType } }) => {
  const [uploadData, setUploadData] = useState(""); // 서버에 보낼 데이터
  const [uploadTypeSwitch, setUploadTypeSwitch] = useState(true); // 이미지/비디오 업로드 스위치


  /**  사용자가 업로드한 이미지/비디오를 base64로 변환 */
  const encodeFileToBase64 = async (fileBlob) => {
    const fileReader = new FileReader(); // file reader 생성
    fileReader.onload = async () => {
    // img, video에 사용할 src데이터에 저장
      await setSrcBase64Data((orginData) => {
        return [...orginData, { base64URL: fileReader.result }];
      });
    };

    fileReader.readAsDataURL(fileBlob); // base64로 변환
  };


  /** 이미지/비디오 업로드 */
  const fileUpload = async (files) => {
    console.log(files);
    const uploadFile = new FormData(); // 서버에 보낼 폼 생성
    setSrcBase64Data([]); // 미리보기 초기화

    if(files.length > 0){
        // 파일을 생성한 폼에 추가
        for (let cnt = 0; cnt < files.length; cnt++) {
          uploadFile.append("uploadFile", files[cnt]);
            await encodeFileToBase64(files[cnt]);
        }
    }else{
        await encodeFileToBase64(files);
    }

    uploadTypeSwitch ? setUploadFileType('img') : setUploadFileType('video'); // 업로드 파일 타입
    setUploadData(uploadFile); // 업로드할 데이터 변경
  };


  /** 서버로 파일 전송 */
  const uploadServer = async () => {
    const response = await axios.post("http://localhost:8000/", uploadData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };


  return (
    <>
    <div className="Upload_container">
      {uploadTypeSwitch ? (
        <>
        <FileUploader handleChange={fileUpload} multiple={true} name="file" types={["JPG", "JPEG"]} />
        </>
      ) : (
        <FileUploader handleChange={fileUpload} name="files" types={["MP4", "MKV"]} />

      )}
      <button onClick={() => setUploadTypeSwitch(!uploadTypeSwitch)}>{uploadTypeSwitch ? 'upload Video' : 'upload Img'}</button>
      <button onClick={uploadServer}>Inference</button>
      </div>
    </>
  );
};

export default UploadComp;
