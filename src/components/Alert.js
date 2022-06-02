import React from "react";
import { useContext } from "react";
import NoteContext from "../context/note/NoteContext";

export default function Alert() {
  const context = useContext(NoteContext);
  const { alert } = context;

  const capitalize = (word) => {
    if (word === "danger") {
      word = "Error";
    }
    const small = word.toLowerCase();
    return small.charAt(0).toUpperCase() + small.slice(1);
  };
  return (
    <div style={{ height: "55px" }}>
      {alert && (
        <div
          className={`alert alert-${alert.type} d-flex align-items-center`}
          role="alert"
        >
          <strong>{capitalize(alert.type)}</strong>: {alert.message}
        </div>
      )}
    </div>
  );
}
