import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./RoomCreated.css";

function RoomCreated() {

  const location = useLocation();
  const roomCode = location.state?.roomCode || "N/A";

  function copyCode() {
    navigator.clipboard.writeText(roomCode);
    alert("Code copied!");
  }

  return (
    <div className="room-created-page">

      <div className="room-created-card">

        <div className="success-icon">
          ✓
        </div>

        <h2>Room Created!</h2>

        <p>
          Your collaborative workspace is ready. Invite your team to start sync-noting.
        </p>

        <div className="code-box">

          <span className="code-label">ROOM ACCESS CODE</span>

          <div className="room-code">
            {roomCode}
          </div>

        </div>

        <button
          className="share-btn"
          onClick={() => navigator.clipboard.writeText(roomCode)}
        >
          🔗 Share Invite Link
        </button>

        <button
          className="copy-btn"
          onClick={copyCode}
        >
          📋 Copy Code
        </button>

        {/* Back to Home */}
        <Link to="/" className="home-btn">
          ⬅ Back to Home
        </Link>

      </div>

    </div>
  );
}

export default RoomCreated;