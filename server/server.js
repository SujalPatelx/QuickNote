import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import {Paste} from './model/past.js'

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json())
dotenv.config()

const upload = multer({storage:multer.memoryStorage()});

connectDB();

app.get('/',(req,res)=>{
    res.send("Hello From Server")
})



app.post('/creatRoon',upload.single('file'),async(req,res)=>{
    const {title,content,code} = req.body;
    console.log("past data : ",req.body)
    if(req.file){
        console.log("File in backend : ",req.file)
    }
    res.send("data comming in server")
    const paste = new Paste( {
        title,
        content,
        code,
    })
    await paste.save();
})

app.get('/room/:code',async (req,res)=>{
    const code = req.params.code;
    console.log("room code : ",code)

    const response = await Paste.findOne({code})
    console.log("response : ",response)
    res.send({response})
})


app.listen(PORT,(err)=>{
    if (err) console.log("error while running server")
    console.log(`SERVER RUNNING ON PORT : ${PORT}`);
})
