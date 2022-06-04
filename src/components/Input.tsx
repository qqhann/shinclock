import { DocumentData, DocumentReference } from "firebase/firestore";
import { HTMLInputTypeAttribute } from "react";
import { useFirestoreInput } from "src/hooks/firestoreInput";

export const Input = <T extends DocumentData & { ref: DocumentReference }>({
  doc,
  field,
  type,
  name,
  placeholder,
}: {
  doc: T;
  field: keyof T;
  type?: HTMLInputTypeAttribute;
  name?: string;
  placeholder?: string;
}) => {
  const { editing, toggle, inputProps } = useFirestoreInput<T>(doc, field);
  if (editing)
    return (
      <div>
        <label
          htmlFor={String(field)}
          className="block text-sm font-medium text-gray-700"
        >
          {name ?? String(field)}
        </label>
        <div className="mt-1">
          <input
            type={type}
            name={String(field)}
            id={String(field)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-100 border-2 rounded-md p-2"
            placeholder={placeholder}
            autoFocus
            {...inputProps}
          />
        </div>
      </div>
    );
  return (
    <span className="block w-full" onClick={toggle}>
      {doc[field]}
    </span>
  );
};
