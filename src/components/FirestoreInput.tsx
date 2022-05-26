import React from "react";
import { DocumentData, DocumentReference, updateDoc } from "firebase/firestore";
import { useInput, useToggle } from "rooks";

export const FirestoreInput = React.memo(
  <T extends DocumentData & { ref: DocumentReference }>(props: {
    doc: T;
    field: keyof T;
  }) => {
    const { doc, field } = props;
    const [editing, toggle] = useToggle();
    const inputProps = useInput(doc[field]);
    const onBlur = () => {
      doc && updateDoc(doc.ref, { [field]: inputProps.value });
      toggle(editing);
    };

    if (editing) return <input {...inputProps} onBlur={onBlur} autoFocus />;
    else return <span onClick={toggle}>{doc[field] ?? "NO_VALUE"}</span>;
  }
);
