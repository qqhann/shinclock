import { db } from "~/api/firebase";
import { collection } from "firebase/firestore";

const roomsRef = collection(db, "rooms");

export const useRooms = () => {
  const create = () => {};
  const get = (id: string) => {};
  return { create, get };
};
