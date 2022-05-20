import React from "react";
import { Link, useParams } from "react-router-dom";
import { useInput } from "rooks";

import { useRoom } from "../hooks/room";
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
  const { room, loading } = useRoom(roomId);
  const { clocks, create } = useClocks(roomId);
  const newClockName = useInput("New clock");
  const newClockMinutes = useInput(25);

  if (loading) return <>Loading...</>;
  return (
    <div className="h-screen w-screen bg-slate-50">
      <Link to="/">
        <h1 className="text-3xl">ShinClock</h1>
      </Link>

      <div className="flex font-sans">
        <div className="flex-auto p-6">
          <p>{room?.name}</p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          create({
            name: newClockName.value,
            total_seconds: newClockMinutes.value * 60,
          });
        }}
      >
        <input className="h-10 px-6 rounded-md border-2" {...newClockName} />
        <input className="h-10 px-6 rounded-md border-2" {...newClockMinutes} />
        <button
          type="submit"
          className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
        >
          create clock
        </button>
      </form>

      {clocks?.map((clock) => (
        <ClockCard clock={clock} key={clock.id} />
      ))}
    </div>
  );
};
