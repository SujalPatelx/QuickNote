import React, { useState } from "react";
import "./CreateRoom.css";
import { useNavigate } from "react-router-dom";

function CreateRoom() {

  const navigate = useNavigate();

  const [duration, setDuration] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  // generate random room code
  function generateRoomCode() {

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let part1 = "";
    let part2 = "";
    let part3 = "";

    for (let i = 0; i < 2; i++) {
      part1 += chars[Math.floor(Math.random() * chars.length)];
    }

    for (let i = 0; i < 3; i++) {
      part2 += chars[Math.floor(Math.random() * chars.length)];
    }

    for (let i = 0; i < 2; i++) {
      part3 += chars[Math.floor(Math.random() * chars.length)];
    }

    return `${part1}-${part2}-${part3}`;
  }

  function createRoom() {

    const roomCode = generateRoomCode();

    const roomData = {
      code: roomCode,
      title: title,
      message: message,
      expiry: duration,
      createdAt: Date.now()
    };

    // later this will go to backend
    console.log("Room data ready for DB:", roomData);

    // navigate to success page
    navigate("/room-created", { state: { roomCode, roomData } });

  }

  return (
    <div className="create-room-page">

      <div className="create-room-card">

        <h1>Create a QuickNote Room</h1>
        <p>Securely share encrypted notes with a temporary self-destructing link.</p>

        <label className="label">Room Title (Optional)</label>
        <input
          placeholder="e.g. Project Alpha Sync"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="label">Message</label>

        <textarea
          placeholder="Type your sensitive note here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 220) + "px";
          }}
        />

        <label className="label">Room Expiry</label>

        <div className="expiry-buttons">

          <button
            className={duration === "10" ? "active" : ""}
            onClick={() => setDuration("10")}
          >
            10 Mins
          </button>

          <button
            className={duration === "60" ? "active" : ""}
            onClick={() => setDuration("60")}
          >
            1 Hour
          </button>

          <button
            className={duration === "1440" ? "active" : ""}
            onClick={() => setDuration("1440")}
          >
            24 Hours
          </button>

        </div>

        <button
          className="create-room-btn"
          onClick={createRoom}
        >
          ⚡ Create Secure Room
        </button>

      </div>

    </div>
  );
}

export default CreateRoom;