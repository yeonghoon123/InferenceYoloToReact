import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const ImageArea = ({ props: { srcBase64Data } }) => {
  const [previewTag, setPreviewTag] = useState(); // 미리보기 이미지 태그
  const [inferenceTag, setInferenceTag] = useState(); // inference한 이미지 태그

  const previewCreate = () => {
    !!srcBase64Data ? (
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
