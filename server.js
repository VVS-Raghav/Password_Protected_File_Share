import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import File from './models/File.js';

dotenv.config();

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const upload = multer({dest : "uploads"});

mongoose.connect(process.env.DATABASE_URL);

app.set("view engine", "ejs");

app.get('/',(req,res)=>{
    res.render("index.ejs");
})

app.get("/file/:id", handleDownload);
app.post("/file/:id", handleDownload);

app.post("/upload",upload.single("file"), async (req, res) => {  
    const fileData = {
        path : req.file.path,
        originalName : req.file.originalname,
    }
    if(req.body.password && req.body.password !== ""){
        fileData.password = await bcrypt.hash(req.body.password, 10);
    }
    const obtainedFile = await File.create(fileData);
    console.log(obtainedFile.id);
    res.render("index.ejs", { fileLink: `${req.headers.origin}/file/${obtainedFile.id}` });
});

async function handleDownload(req,res){
    const file = await File.findById(req.params.id);
    if(file.password!=null) {
        if(req.body===undefined || req.body.password == null) {
            return res.render("password.ejs", { error:false });
        }
        if(!(await bcrypt.compare(req.body.password, file.password))) {
            return res.render("password.ejs", { error: true });
        }
    }
    file.downloadCount++;
    await file.save();
    res.download(file.path, file.originalName);
}

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});