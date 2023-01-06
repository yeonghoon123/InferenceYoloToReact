const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const { execSync } = require("child_process");
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer();

app.get("/", (req, res) => {
    res.send("hi");
});

app.post("/", upload.any(), (req, res) => {
    console.log(req.body.modelKind);
    console.log(req.files);

    const path = "E:/InferenceYoloToReact";

    if (fs.existsSync("./temp")) {
        fs.rmdirSync("./temp", { recursive: true });
    }
    fs.mkdirSync("./temp");

    req.files.map((data) => {
        fs.writeFileSync(`./temp/${data.originalname}`, data.buffer);
    });

    let modelid = { yolov5: "yolov5_PBL", efficientdet: "efficientdet_PBL", maskrcnn: "maskrcnn_PBL" };
    modelid = modelid[req.body.modelKind];
    const modelnm = req.body.modelKind;

    if (fs.existsSync(`${path}/server/inference/${modelnm}`)) {
        fs.rmdirSync(`${path}/server/inference/${modelnm}`, { recursive: true });
    }
    fs.mkdirSync(`${path}/server/inference/${modelnm}`);

    let py = "";
    let source = "";
    let weights = "";
    let project = "";

    switch (req.body.modelKind) {
        case "yolov5":
            // yolov5 설정
            py = "detect.py";
            source = `${path}/server/temp`;
            weights = `${path}/model/${modelnm}/${modelnm}s.pt`;
            project = `${path}/server/inference/${modelnm}`;
            break;

        case "efficientdet":
            // efficientdet 설정
            py = "inference.py";
            source = `${path}/server/temp`;
            weights = `${path}/model/${modelnm}/weights/${modelnm}-d0.pth`;
            project = `${path}/server/inference/${modelnm}`;
            break;

        case "maskrcnn":
            // maskrcnn 설정
            py = "inference.py";
            source = `${path}/server/temp`;
            weights = `COCO-InstanceSegmentation/mask_rcnn_X_101_32x8d_FPN_3x.yaml`;
            project = `${path}/server/inference/${modelnm}`;
            break;

        default:
            break;
    }

    execSync(
        `conda activate ${modelid} & python ${path}/model/${modelnm}/${py} --source ${source} --weights ${weights} --project ${project}`
    );

    res.send(fs.readdirSync(`${path}/server/inference/${modelnm}/`));
});

app.listen(port, () => console.log(`${port} connect complete`));
