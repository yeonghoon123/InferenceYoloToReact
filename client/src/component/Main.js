import React, { useState } from "react";
import UploadComp from "./Upload";

const Main = () => {
    const [uploadFileType, setUploadFileType] = useState('img');
    const [srcBase64Data, setSrcBase64Data] = useState([]);
    console.log(uploadFileType)
    return(
    <>
        <UploadComp props={ {setSrcBase64Data, setUploadFileType} }/>
    </>
    )
}

export default Main;