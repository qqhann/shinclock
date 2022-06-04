import { DocumentData, DocumentReference, updateDoc } from "firebase/firestore";
import { useInput, useToggle } from "rooks";

export const useFirestoreInput = <
  T extends DocumentData & { ref: DocumentReference }
>(
  doc: T,
  field: keyof T
) => {
  const [editing, toggle] = useToggle();
  const inputProps = useInput(doc[field]);
  const onBlur = () => {
    doc && updateDoc(doc.ref, { [field]: inputProps.value });
    toggle(editing);
  };
  return { editing, toggle, inputProps: { ...inputProps, onBlur } };
};
