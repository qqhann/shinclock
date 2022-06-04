import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInput } from "rooks";

import { useRoom, useRooms } from "src/hooks/room";
import { useClocks } from "src/hooks/clock";
import { ClockCard } from "src/components/ClockCard";
import { FirestoreInput } from "src/components/FirestoreInput";
import { Container } from "src/components/Container";
import { Header } from "src/components/Header";

export const Room = () => {
  const { roomId } = useParams();
  const { room, loading } = useRoom(roomId);
  const { clocks, create } = useClocks(roomId);
  const newClockName = useInput("New clock");
  const newClockMinutes = useInput(25);
  const { create: createRoom } = useRooms();

  if (loading) return <>Loading...</>;
  if (!loading && !room)
    return (
      <div>
        <h1>404 Room not found</h1>
        <button onClick={() => createRoom({ id: roomId, name: roomId })}>
          Create room with id {roomId}
        </button>
      </div>
    );
  return (
    <Container>
      <Header />

      <div className="flex font-sans">
        <div className="flex-auto p-6">
          {room && <FirestoreInput doc={room} field="name" />}
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
    </Container>
  );
};
