import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/note/NoteContext";

const LoginPage = () => {
  const context = useContext(NoteContext);
  const { showAlert } = context;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4Y2QxYTRiM2Q5N2MzMDJjOWFlM2NhIn0sImlhdCI6MTY1MzM5NjcyNH0.xo_S__nAbYWkUOkvvqFPHsBcEyNjR52bZD43oS6GJhk",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
      showAlert("Logged in Successfully", "success");
    } else {
      showAlert("Invalid Credentials", "danger");
    }
  };
  return (
    <div className="container">
      <h2 className="my-2">Login to continue to iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={onChange}
            name="email"
            value={credentials.email}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            name="password"
            value={credentials.password}
            onChange={onChange}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
