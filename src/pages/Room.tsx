import React from "react";
import { useParams } from "react-router-dom";
import { useInput } from "rooks";

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
  const newClockName = useInput("New clock");

  return (
    <div className="h-screen w-screen bg-slate-50">
      <h1 className="text-3xl">ShinClock</h1>

      <div className="flex font-sans">
        <div className="flex-auto p-6">
          <p>{roomId}</p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          create({ name: newClockName.value });
        }}
      >
        <input className="h-10 px-6 rounded-md border-2" {...newClockName} />
        <input
          type="submit"
          value="create clock"
          className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
        />
      </form>

      {clocks?.map((clock) => (
        <ClockCard clock={clock} key={clock.id} />
      ))}
    </div>
  );
};
