import React, { useContext, useState } from "react";
import NoteContext from "../context/note/NoteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote, showAlert } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleOnClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    showAlert("Note Added Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Add Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="title"
            onChange={onChange}
            minLength={5}
            required
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            name="description"
            type="text"
            className="form-control"
            id="description"
            onChange={onChange}
            minLength={5}
            required
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            name="tag"
            type="text"
            className="form-control"
            id="tag"
            onChange={onChange}
            value={note.tag}
          />
        </div>
        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleOnClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
