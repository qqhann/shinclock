
import React, { useState } from "react";
import { useIntervalWhen, useToggle } from "rooks";
import { useRooms } from "../hooks/room";

export const Home = ()=> {
	const {create} = useRooms()
	const onCreateRoom = ()=>{
		create()
	}

  return (
    <div className="h-full">
      <h1 className="text-3xl">ShinClock</h1>
      <button onClick={onCreateRoom}>Create new room</button>
    </div>
  );
}

