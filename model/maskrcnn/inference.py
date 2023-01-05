# Some basic setup:
# Setup detectron2 logger
import glob

import torch
from PIL import Image

import detectron2
from detectron2.utils.logger import setup_logger
setup_logger()

# import some common libraries
import numpy as np
import os, json, cv2, random

# import some common detectron2 utilities
from detectron2 import model_zoo
from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg
from detectron2.utils.visualizer import Visualizer
from detectron2.data import MetadataCatalog, DatasetCatalog

# The flag below controls whether to allow TF32 on matmul. This flag defaults to False
# in PyTorch 1.12 and later.
torch.backends.cuda.matmul.allow_tf32 = False

# The flag below controls whether to allow TF32 on cuDNN. This flag defaults to True.
torch.backends.cudnn.allow_tf32 = False

# Load Dataset
data_path = "data/Object Detection/COCO/val2017"
test_dataset = sorted(glob.glob(os.path.join(data_path, '*.jpg')))
print("Dataset Size : ", len(test_dataset))

# img = cv2.imread('./zidane.jpg')
# cv2.imshow('input',img)
#cv2.waitKey(0)

model_name = "COCO-InstanceSegmentation/mask_rcnn_X_101_32x8d_FPN_3x.yaml"
cfg = get_cfg()
# add project-specific config (e.g., TensorMask) here if you're not running a model in detectron2's core library
cfg.merge_from_file(model_zoo.get_config_file(model_name))
cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.5  # set threshold for this model
# Find a model from detectron2's model zoo. You can use the https://dl.fbaipublicfiles... url as well
cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url(model_name)
model = model_zoo.get(model_name, trained=True)
print(model)
print(cfg.MODEL)
predictor = DefaultPredictor(cfg)

for i, fn_path in enumerate(test_dataset):
    # Read Test Data
    img = Image.open(fn_path)  # Read with PIL to match detectron2
    img = np.asarray(img)

    img_name = fn_path.split("\\")[-1]

    outputs = predictor(img)

    # look at the outputs. See https://detectron2.readthedocs.io/tutorials/models.html#model-output-format for specification
    # print(outputs["instances"].pred_classes)
    # print(outputs["instances"].pred_boxes)

    # We can use `Visualizer` to drqaw the predictions on the image.
    v = Visualizer(img[:, :, ::-1], MetadataCatalog.get(cfg.DATASETS.TRAIN[0]), scale=1.5)
    out = v.draw_instance_predictions(outputs["instances"].to("cpu"))
    # cv2.imshow('output',out.get_image()[:, :, ::-1])
    cv2.imwrite(f'test/{img_name}', out.get_image())
    cv2.waitKey(0)