import React, { useState } from "react";
import UploadComp from "./Upload";
import ImageArea from "./ImageArea";
import "../css/Main.css";

const Main = () => {
    const [uploadFileType, setUploadFileType] = useState();
    const [srcBase64Data, setSrcBase64Data] = useState([]);
    return(
    <>
        <div className="Main_container">
            <UploadComp props={ {setSrcBase64Data, setUploadFileType} }/>
            <div className="Main_imgarea">
                <ImageArea props={{uploadFileType,srcBase64Data}}/>
            </div>
        </div>
    </>
    )
}

export default Main; 