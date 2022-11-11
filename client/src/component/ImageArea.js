import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const ImageArea = ({ props: { uploadFileType, srcBase64Data } }) => {
  const [previewTag, setPreviewTag] = useState();
  const [inferenceTag, setInferenceTag] = useState();

  const previewCreate = () => {
    uploadFileType === "img" ? (
      setPreviewTag(
        <>
          <h4>Preview {uploadFileType}</h4>
          <Carousel variant="dark">
            {srcBase64Data.map((value, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={value.length !== 0 ? value.base64URL : ""}
                  alt="First slide"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      )
    ) : uploadFileType === "video" ? (
      setPreviewTag(
        <>
        <h4>Preview {uploadFileType}</h4>
        <video
          src={srcBase64Data.length !== 0 ? srcBase64Data[0].base64URL : ""}
          autoPlay={false}
          controls={true}
        />
        </>
      )
    ) : (
      <></>
    );
  };

  useEffect(() => {
    previewCreate();
    console.log(srcBase64Data);
  }, [srcBase64Data]);
  return (
    <>
      <div className="ImageArea_preview">{previewTag}</div>
      <div className="ImageArea_inference">{inferenceTag}</div>
    </>
  );
};

export default ImageArea;
