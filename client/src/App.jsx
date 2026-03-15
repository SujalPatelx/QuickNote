import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import RoomCreated from "./pages/RoomCreated";
import RoomView from "./pages/RoomView";



function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/create-room" element={<CreateRoom />} />

        <Route path="/room-created" element={<RoomCreated />} />
        
        <Route path="/room/:code" element={<RoomView />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;