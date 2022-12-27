import React, { useState } from "react";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";

const UploadComp = ({ props: { setSrcBase64Data } }) => {
  const [uploadData, setUploadData] = useState(""); // 서버에 보낼 데이터
  const [inferenceModel, setInferenceModel] = useState(null); // inference할 모델
  const modelList = ['model1','model2','model3']; // inference 가능 모델

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


  /** 이미지 업로드 */
  const fileUpload = async (files) => {
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
        <FileUploader handleChange={fileUpload} multiple={true} name="file" types={["JPG", "JPEG"]} />
      <select onChange={ (e) => setInferenceModel(e.target.value)}>
        <option disabled>-- Select Model --</option>
        {modelList.map((modelValue) => <option value={modelValue} key={modelValue}>{modelValue.toUpperCase()}</option>)}
      </select>
      <button onClick={uploadServer}>Inference</button>
      </div>
    </>
  );
};

export default UploadComp;
