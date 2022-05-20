import { db } from "../api/firebase";
import {
  collection,
  Timestamp,
  FirestoreDataConverter,
  serverTimestamp,
  WithFieldValue,
  DocumentData,
  doc,
  setDoc,
  DocumentReference,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

/*
 * Clock
 * -----
 * name - The clock name
 * running - Is the clock running right now
 * start_at - The current run started at
 * seconds_passed - Seconds remaining until end
 * total_seconds - Total of the timer in seconds
 */
export type Clock = {
  id: string;
  ref: DocumentReference;
  name: string;
  running: boolean;
  start_at: Timestamp;
  total_seconds: number;
  seconds_passed: number;
};

const clockConverter: FirestoreDataConverter<Clock> = {
  toFirestore(clock: WithFieldValue<Clock>): DocumentData {
    return {
      name: clock.name,
      running: clock.running,
      start_at: clock.start_at,
      seconds_passed: clock.seconds_passed,
      total_seconds: clock.total_seconds,
    };
  },
  fromFirestore(snapshot, options?): Clock {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      ref: snapshot.ref,
      name: data.name,
      running: data.running,
      start_at: data.start_at,
      seconds_passed: data.seconds_passed,
      total_seconds: data.total_seconds,
    };
  },
};

export const useClocks = (roomId: string | undefined) => {
  const clocksRef = collection(
    db,
    "rooms",
    roomId ?? "_",
    "clocks"
  ).withConverter(clockConverter);

  const [clocks, loading, error, snapshot] = useCollectionData(clocksRef);

  const create = () => {
    if (!roomId) return;
    return setDoc(
      doc(clocksRef),
      {
        name: "New clock",
        running: true,
        start_at: Timestamp.now(),
        total_seconds: 60,
        seconds_passed: 0,
      },
      { merge: true }
    );
  };
  const get = (id: string) => {};
  return { create, get, clocks };
};

export const useClock = (clock: Clock) => {
  const start = () => {
    updateDoc(clock.ref, { running: true, start_at: Timestamp.now() });
  };
  const stop = () => {
    updateDoc(clock.ref, { running: false });
  };
  const reset = () => {
    updateDoc(clock.ref, {
      running: false,
      seconds_passed: clock.total_seconds,
    });
  };
  const remove = () => {
    deleteDoc(clock.ref);
  };

  return { start, stop, reset, remove };
};
