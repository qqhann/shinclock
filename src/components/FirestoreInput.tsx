import React from "react";
import { DocumentData, DocumentReference, updateDoc } from "firebase/firestore";
import { useInput, useToggle } from "rooks";

export const FirestoreInput = <
  T extends DocumentData & { ref: DocumentReference }
>({
  doc,
  field,
}: {
  doc: T;
  field: keyof T;
}) => {
  const [editing, toggle] = useToggle();
  const inputProps = useInput(doc[field]);
  const onBlur = () => {
    doc && updateDoc(doc.ref, { [field]: inputProps.value });
    toggle(editing);
  };

  return (
    <>
      {editing ? (
        <input {...inputProps} onBlur={onBlur} />
      ) : (
        <span onClick={toggle}>{doc[field]}</span>
      )}
    </>
  );
};
