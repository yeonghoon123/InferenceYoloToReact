# Inference from YOLO to React

1. Project Name - Inference from YOLO to React

2. 구성원 및 역할   
    김영훈 : Frontend   
    김현준 : Backend    
    신승미 : Model Inference

3. 사용 기술    
    * Frontend : React
    * Backend : Express
    * Model : efficientdet, maskrcnn, YOLOV5

4. 버전 V0.41

--------------------------------------------------------
1. 모델별 inference 코드 파일명
    - efficientdet : inference.py
    - maskrcnn : inference.py
    - yolov5 : detect.py

2. 모델별 가상환경
    - efficientdet
        - conda create -n efficientdet_PBL python=3.7
        - conda activate efficientdet_PBL
        - pip install -r efficientdet__requirements.txt
        - pip install torch==1.12.0+cu116 torchvision==0.13.0+cu116 torchaudio==0.12.0+cu116 --extra-index-url https://download.pytorch.org/whl/cu116
    - maskrcnn
        - conda create -n maskrcnn_PBL python=3.7
        - conda activate maskrcnn_PBL
        - pip install -r maskrcnn_requirements.txt
    - yolov5
        - conda create -n yolov5_PBL python=3.8
        - conda activate yolov5_PBL
        - pip install -r yolov5_requirements.txt
