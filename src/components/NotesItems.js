import React, { useContext } from "react";
import NoteContext from "../context/note/NoteContext";

const NotesItems = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, handleEdit } = props;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>

          <i
            className="fa-solid fa-pen-to-square mx-2"
            onClick={() => {
              handleEdit(note);
            }}
          ></i>
          <i
            className="fa-solid fa-trash mx-2"
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NotesItems;
