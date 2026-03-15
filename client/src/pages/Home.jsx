import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {

  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");

  const joinRoom = () => {

    const rooms = JSON.parse(localStorage.getItem("quicknoteRooms")) || [];

    const room = rooms.find((r) => r.code === roomCode.trim());

    if (room) {
      navigate(`/room/${roomCode}`, { state: { room } });
    } else {
      alert("Room not found. Check the code.");
    }

  };

  return (
    <div className="home-page">

      {/* Title */}
      <h1 className="title">
        Quick<span>Note</span>
      </h1>

      <p className="subtitle">
        Your digital sanctuary for fleeting thoughts and shared sparks.
      </p>

      {/* Floating notes */}
      <div className="note note-left">
        Pick up milk & bread!
      </div>

      <div className="note note-right">
        Meeting at 4pm with the design team ✨
      </div>

      {/* Main Card */}
      <div className="card">

        <div className="section">
          <h3>+ Start Fresh</h3>

          <Link to="/create-room" className="create-btn">
            👥 Create a New Room
          </Link>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="section">
          <h3>Join a Friend</h3>

          <p className="room-label">Room Access Code</p>

          <input
            type="text"
            placeholder="Enter room code"
            className="room-input"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />

          <button
            className="join-btn"
            onClick={joinRoom}
          >
            Enter Room
          </button>

        </div>

      </div>

      <p className="quote">
        "Great ideas start with a single word."
      </p>

    </div>
  );
};

export default Home;