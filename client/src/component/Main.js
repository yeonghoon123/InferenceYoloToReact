import React, { useState } from "react";
import UploadComp from "./Upload";
import ImageArea from "./ImageArea";
import "../css/Main.css";

const Main = () => {
    const [uploadImg, setUploadImg] = useState(false);
    const [srcBase64Data, setSrcBase64Data] = useState([]);
    return(
    <>
        <div className="Main_container">
            <UploadComp props={ {setSrcBase64Data, setUploadImg} }/>
            <div className="Main_imgarea">
                <ImageArea props={{uploadImg,srcBase64Data}}/>
            </div>
        </div>
    </>
    )
}

export default Main; 