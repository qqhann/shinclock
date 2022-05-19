import { db } from "../api/firebase";
import { collection, addDoc } from "firebase/firestore";

export const roomsRef = collection(db, "rooms");

export const useRooms = () => {
  const create = async () => {
    const roomRef = await addDoc(roomsRef, { title: "New clock" });
    return roomRef;
  };
  const get = (id: string) => {};
  return { create, get };
};
