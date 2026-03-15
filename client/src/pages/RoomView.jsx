import React from "react";
import { useLocation } from "react-router-dom";
import "./RoomView.css";

function RoomView(){

const location = useLocation();
const room = location.state?.room;

if(!room){
return <div>Room not found</div>;
}

return(

<div className="roomview-page">

<div className="roomview-card">

<div className="room-header">

<div className="room-code">
<span>ROOM CODE</span>
<h3>{room.code}</h3>
</div>

<div className="expiry">
⏱ Expires in {room.expiry} mins
</div>

</div>

<div className="message-box">

<h2>{room.title || "Shared Note"}</h2>

<p className="message-text">
{room.message}
</p>

</div>

<div className="room-actions">

<button
className="copy-btn"
onClick={()=>navigator.clipboard.writeText(room.message)}
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