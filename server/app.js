const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

const upload = multer();

app.get('/',(req,res) => {
    res.send("hi");
})

app.post('/', upload.any(), (req,res) => {
    console.log(req.files);
    res.send("hello");
})

app.listen(port, () => console.log(`${port} connect complete`));
