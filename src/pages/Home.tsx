import React from "react";
import { useNavigate } from "react-router-dom";
import { useRooms } from "../hooks/room";

export const Home = () => {
  const navigate = useNavigate();
  const { create } = useRooms();
  const onCreateRoom = () => {
    create().then((res) => {
      navigate(res.id);
    });
  };

  return (
    <div className="h-full">
      <h1 className="text-3xl">ShinClock</h1>
      <button onClick={onCreateRoom}>Create new room</button>
    </div>
  );
};
