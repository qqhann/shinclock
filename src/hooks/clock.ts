import { db } from "~/api/firebase";
import { collection } from "firebase/firestore";

const clocksRef = collection(db, "clocks");

export const useClocks = () => {
  const create = () => {};
  const get = (id: string) => {};
  return { create, get };
};
