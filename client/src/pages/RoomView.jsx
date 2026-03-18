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

useEffect(() => {

    async function getData() {
      const res = await axios.get(`http://192.168.31.247:3000/room/${code}`);
      console.log(res.data.response.content);
      console.log(res.data.response.code);
      setContent(res.data.response.content);
      setRoomCode(res.data.response.code);
    }

    getData();
    console.log("room code:", code);

  }, [code]);


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