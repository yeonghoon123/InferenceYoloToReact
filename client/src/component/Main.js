import React, { useState } from "react";
import UploadComp from "./Upload";
import ImageArea from "./ImageArea";
import "../css/Main.css";

const Main = () => {
    const [inferenceBase64Data, setInferenceBase64Data] = useState([]); // 업로드된 이미지의 base64
    const [srcBase64Data, setSrcBase64Data] = useState([]); // 업로드된 이미지의 base64
    const [loading, setLoading] = useState(false);
    return(
    <>
        <div className="Main_container">
            <UploadComp props={ {setLoading ,setSrcBase64Data, setInferenceBase64Data} }/>
            <div className="Main_imgarea">
                <ImageArea props={{srcBase64Data,loading, inferenceBase64Data}}/>
            </div>
        </div>
    </>
    )
}

export default Main; 