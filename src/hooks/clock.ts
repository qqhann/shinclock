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

export type Clock = {
  id: string;
  ref: DocumentReference;
  name: string;
  running: boolean;
  start_at: Timestamp;
  total_seconds: number;
};

const clockConverter: FirestoreDataConverter<Clock> = {
  toFirestore(clock: WithFieldValue<Clock>): DocumentData {
    return {
      name: clock.name,
      running: clock.running,
      start_at: clock.start_at,
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
        start_at: serverTimestamp(),
        total_seconds: 60,
      },
      { merge: true }
    );
  };
  const get = (id: string) => {};
  return { create, get, clocks };
};

export const useClock = (ref: DocumentReference) => {
  const start = () => {
    updateDoc(ref, { running: true });
  };
  const stop = () => {
    updateDoc(ref, { running: false });
  };
  const remove = () => {
    deleteDoc(ref);
  };

  return { start, stop, remove };
};
