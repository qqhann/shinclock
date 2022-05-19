import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useClocks } from "../hooks/clock";
import { ClockCard } from "../components/ClockCard";

export const Room = () => {
  /*
   * Clock
   * running
   * start time
   * total seconds
   *
   * useIntervalWhen
   * remaining = total seconds - (now - start)
   * format remaining to string
   * これで
   */
  const { roomId } = useParams();
  const { clocks, create } = useClocks(roomId);

  useEffect(() => {
    console.log(roomId);
  }, [roomId]);

  return (
    <div className="h-screen w-screen bg-slate-50">
      <h1 className="text-3xl">ShinClock</h1>

      <div className="flex font-sans">
        <div className="flex-auto p-6">
          <p>{roomId}</p>
        </div>
      </div>

      <button onClick={create}>create clock</button>
      {clocks?.map((clock, i) => (
        <ClockCard clock={clock} key={i} />
      ))}
    </div>
  );
};
