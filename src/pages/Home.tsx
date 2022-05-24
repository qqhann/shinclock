import React from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "rooks";
import { useRooms } from "src/hooks/room";

export const Home = () => {
  const navigate = useNavigate();
  const { create } = useRooms();
  const newRoomName = useInput();

  return (
    <div className="h-full">
      <h1 className="text-3xl">ShinClock</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          create({ name: newRoomName.value }).then((res) => {
            navigate(res.id);
          });
        }}
      >
        <input
          placeholder="New room name"
          className="h-10 px-6 rounded-md border-2"
          {...newRoomName}
        />
        <button
          type="submit"
          className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
        >
          Create new room
        </button>
      </form>
    </div>
  );
};
