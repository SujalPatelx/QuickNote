import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

const PORT = 3000

const app = express();
app.use(cors());
app.use(express.json())

connectDB();

app.get('/',(req,res)=>{
    res.send("Hello From Server")
})



app.listen(PORT,(err)=>{
    if (err) console.log("error while running server")
    console.log(`SERVER RUNNING ON PORT : ${PORT}`);
})
