import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./RoomView.css";
import axios from "axios";
import { useState } from "react";
function RoomView(){
const {code}= useParams();

const [content,setContent] = useState("")
const [roomCode, setRoomCode] = useState("")
const [fileUrl, setFileUrl] = useState("")

const attachmentUrl = fileUrl.includes("/upload/")
  ? fileUrl.replace("/upload/", "/upload/fl_attachment/")
  : fileUrl;

useEffect(() => {

    async function getData() {
      const res = await axios.get(`http://localhost:3000/room/${code}`);
      const room = res.data?.response;
      if (!room) return;
      setContent(room.content ?? "");
      setRoomCode(room.code ?? "");
      setFileUrl(room.fileUrl ?? "");
    }

    getData();
    console.log("room code:", code);

  }, [code]);

  const handledownload = () => {
    if (!fileUrl) {
      alert("No file available for this room.");
      return;
    }

    const url = fileUrl.includes("/upload/")
      ? fileUrl.replace("/upload/", "/upload/fl_attachment/")
      : fileUrl;

    console.log("download url:", url);

    // Trigger download via anchor click (more reliable than window.open).
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };


return(

<div className="roomview-page">

<div className="roomview-card">

<div className="room-header">

<div className="room-code">
<span>ROOM CODE</span>
<h3>{roomCode}</h3>
</div>

<div className="expiry">
⏱ Expires in 10 mins
</div>

</div>

<div className="message-box">

<h2></h2>

<p className="message-text">
{content}
</p>

</div>

<div>
  <button onClick={handledownload} disabled={!fileUrl}>
    Download File
  </button>

  {fileUrl ? (
    <div style={{ marginTop: 8 }}>
      <div>
        <a href={fileUrl} target="_blank" rel="noreferrer">
          Open File (raw)
        </a>
      </div>
      <div>
        <a href={attachmentUrl} target="_blank" rel="noreferrer">
          Open File (attachment)
        </a>
      </div>
    </div>
  ) : null}
</div>

<div className="room-actions">

<button
className="copy-btn"
onClick={()=>navigator.clipboard.writeText("copy copyy copyyyy")}
>
📋 Copy Message
</button>

<button
className="share-btn"
onClick={()=>navigator.clipboard.writeText(window.location.href)}
>
🔗 Share Link
</button>

</div>

</div>

<p className="footer-quote">
"Great ideas start with a single word."
</p>

</div>

)

}

export default RoomView;