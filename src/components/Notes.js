import React, { useContext, useEffect, useRef, useState } from "react";
import AddNote from "./AddNote";
import NoteContext from "../context/note/NoteContext";
import NotesItems from "./NotesItems";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  let navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, getNote, updateNote, showAlert } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const handleEdit = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNote();
    } else {
      // eslint-disable-next-line 
      navigate("/login");
    }
  }, []);

  const handleOnClick = (e) => {
    e.preventDefault();
    updateNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    showAlert("Note Updated Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote />
      <div>
        <button
          type="button"
          ref={ref}
          // hide using display none class
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Modal
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                      Title
                    </label>
                    <input
                      name="etitle"
                      type="text"
                      className="form-control"
                      id="etitle"
                      onChange={onChange}
                      value={note.etitle}
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      Description
                    </label>
                    <input
                      value={note.edescription}
                      name="edescription"
                      type="text"
                      className="form-control"
                      id="edescription"
                      onChange={onChange}
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">
                      Tag
                    </label>
                    <input
                      value={note.etag}
                      name="etag"
                      type="text"
                      className="form-control"
                      id="etag"
                      onChange={onChange}
                    />
                  </div>{" "}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  ref={refClose}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  disabled={
                    note.etitle.length < 5 || note.edescription.length < 5
                  }
                  type="button"
                  onClick={handleOnClick}
                  className="btn btn-primary"
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length === 0 && "No notes to preview"}{" "}
        </div>
        {notes.map((note) => {
          return (
            <NotesItems key={note._id} handleEdit={handleEdit} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
