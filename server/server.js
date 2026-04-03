import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import connectDB from "./config/db.js";
import { Paste } from "./model/past.js";

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const upload = multer({ storage: multer.memoryStorage() });
cloudinary.v2.config({
  cloud_name: `${process.env.CLOUDINARY_NAME}`,
  api_key: `${process.env.CLOUDINARY_API}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
});

connectDB();

app.get("/", (req, res) => {
  res.send("Hello From Server");
});

app.post("/creatRoon", upload.single("file"), async (req, res) => {
  const { title, content, code } = req.body;
  console.log("past data : ", req.body);
  console.log("file in backend : ", req.file ? req.file.originalname : "no file");
  let fileUrl = null;
  try {
    if (req.file) {
      const resource_type = req.file.mimetype?.startsWith("image/") ? "image" : "raw";
      // upload_stream is callback-based, so wrap it in a Promise.
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          { resource_type },
          (error, result) => {
            if (error) return reject(error);
            return resolve(result);
          },
        );

        stream.end(req.file.buffer);
      });

      fileUrl = uploadResult?.secure_url;

      console.log("cloudinary upload secure_url:", fileUrl);
      if (!fileUrl) {
        console.log("cloudinary upload result (truncated):", {
          keys: uploadResult ? Object.keys(uploadResult) : [],
          public_id: uploadResult?.public_id,
        });
      }
    }

    const paste = new Paste({
      title,
      content,
      code,
      fileUrl,
    });
    await paste.save();

    console.log("saved paste : ", {
      code: paste.code,
      fileUrl: paste.fileUrl,
    });

    return res.send({
      message: "data comming in server",
      data: paste,
    });
  } catch (error) {
    console.log("error while creating room : ", error);
    return res.status(500).send("Failed to create room");
  }
});

app.get("/room/:code", async (req, res) => {
  const code = req.params.code;
  console.log("room code : ", code);

  const response = await Paste.findOne({ code });
  console.log("response : ", response);
  res.send({ response });
});

app.listen(PORT, (err) => {
  if (err) console.log("error while running server");
  console.log(`SERVER RUNNING ON PORT : ${PORT}`);
});
