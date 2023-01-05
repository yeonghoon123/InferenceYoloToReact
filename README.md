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
        - pip install torch==1.12.0+cu116 torchvision==0.13.0+cu116 torchaudio==0.12.0+cu116 --extra-index-url https://download.pytorch.org/whl/cu116
        - pip install -r efficientdet__requirements.txt
    - maskrcnn
        - conda create -n maskrcnn_PBL python=3.7
        - conda activate maskrcnn_PBL
        - pip install -r maskrcnn_requirements.txt
    - yolov5
        - conda create -n yolov5_PBL python=3.8
        - conda activate yolov5_PBL
        - pip install -r yolov5_requirements.txt

--------------------------------------------------------
# 에러
1. "ERROR: Could not install packages due to an OSError: [Errno 2] No such file or directory" 발생시
    - 참고 : https://www.howtogeek.com/266621/how-to-make-windows-10-accept-file-paths-over-260-characters/
    - 원인 : 설치할 경로가 길어서 OSError
    - 해결 : 레지스터 편집기에서 경로 길이 제한 해제하면 됨 (재부팅 필수!)