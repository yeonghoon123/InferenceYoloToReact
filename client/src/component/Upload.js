import React, { useState } from "react";

const UploadComp = () => {
    const [uploadData, setUploadData] = useState("");
    const fileImgUpload = (event) => {
        const getImgs = event.target.files;
        const uploadData = new FormData();
        for(let cnt = 0; cnt < getImgs.length; cnt++){
        }
    }

    const fileVideoUpload = (event) => {

    }
    return(
        <>
            <input type="file" accept="image/*" multiple={true} onChange={fileImgUpload}/>
            <input type="file" onChange={fileVideoUpload}/>
            <h1>hello world</h1>
        </>
    )
}

export default UploadComp