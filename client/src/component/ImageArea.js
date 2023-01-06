import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Spinner from 'react-bootstrap/Spinner';

const ImageArea = ({ props: { srcBase64Data, loading, inferenceBase64Data } }) => {
  const [previewTag, setPreviewTag] = useState(); // 미리보기 이미지 태그
  const [inferenceTag, setInferenceTag] = useState(); // inference한 이미지 태그

  /** 업로드한 이미지보기 */
  const previewCreate = () => {
    srcBase64Data.length !== 0 ? (
      setPreviewTag(
        <>
          <h4>Inference Image</h4>
          <Carousel variant="dark" interval={null}>
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

  /** inference한 이미지보기 */
  const inferenceCreate = () => {
    inferenceBase64Data.length !== 0 ? (
      setInferenceTag(
        <>
          <h4>Preview Image</h4>
          <Carousel variant="dark" interval={null}>
            {inferenceBase64Data.map((value, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={value.base64URL}
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

  useEffect(() => {
    inferenceCreate();
  }, [inferenceBase64Data]);
  return (
    <>
      <div className="ImageArea_preview">{previewTag}</div>
      <div className="ImageArea_inference"> {loading ?
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> : inferenceTag}</div>
    </>
  );
};

export default ImageArea;
