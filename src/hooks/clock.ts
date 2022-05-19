import { db } from "../api/firebase";
import {
  collection,
  addDoc,
  Timestamp,
  serverTimestamp,
  CollectionReference,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

type Clock = {
  name: string;
  running: boolean;
  start_at: Timestamp;
  total_seconds: number;
};

export const useClocks = (roomId: string | undefined) => {
  const clocksRef = collection(
    db,
    "rooms",
    roomId ?? "_",
    "clocks"
  ) as CollectionReference<Clock>;
  const [clocks, loading, error, snapshot] = useCollectionData(clocksRef);

  const create = () => {
    if (!roomId) return;
    return addDoc(clocksRef, {
      name: "New clock",
      running: true,
      start_at: serverTimestamp(),
      total_seconds: 60,
    });
  };
  const get = (id: string) => {};
  return { create, get, clocks };
};
