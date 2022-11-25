import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const ImageArea = ({ props: { uploadImg, srcBase64Data } }) => {
  const [previewTag, setPreviewTag] = useState();
  const [inferenceTag, setInferenceTag] = useState();

  const previewCreate = () => {
    uploadImg ? (
      setPreviewTag(
        <>
          <h4>Preview Image</h4>
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
    ) : <></>
  };

  useEffect(() => {
    previewCreate();
  }, [srcBase64Data]);
  return (
    <>
      <div className="ImageArea_preview">{previewTag}</div>
      <div className="ImageArea_inference">{inferenceTag}</div>
    </>
  );
};

export default ImageArea;
