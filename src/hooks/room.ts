import { db } from "../api/firebase";
import {
  collection,
  addDoc,
  DocumentReference,
  FirestoreDataConverter,
  WithFieldValue,
  DocumentData,
  doc,
  setDoc,
  PartialWithFieldValue,
} from "firebase/firestore";

export type Room = {
  id: string;
  ref: DocumentReference;
  name: string;
};
const roomConverter: FirestoreDataConverter<Room> = {
  toFirestore(room: WithFieldValue<Room>): DocumentData {
    return {
      name: room.name,
    };
  },
  fromFirestore(snapshot, options?): Room {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      ref: snapshot.ref,
      name: data.name,
    };
  },
};

export const roomsRef = collection(db, "rooms").withConverter(roomConverter);

export const useRooms = () => {
  const create = async (specified: PartialWithFieldValue<Room>) => {
    const docRef = doc(roomsRef);
    await setDoc(
      doc(roomsRef),
      { name: "New clock", ...specified },
      { merge: true }
    );
    return docRef;
  };
  const get = (id: string) => {};
  return { create, get };
};
