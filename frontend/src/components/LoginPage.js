import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { startLogin } from "../actions/loginAction";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [formIssues, setFormIssues] = useState("");
  const errors = {};
  const handleChange = (e) => {
    const type = e.target.name;
    const val = e.target.value;
    type === "email" ? setEmail(val) : setPassword(val);
  };
  const runValidators = () => {
    if (email.length == 0) {
      errors.emailError = "Email cannot be empty";
    }
    if (password.length == 0) {
      errors.passwordError = "Password cannot be empty";
    }
    console.log(errors);
  };
  const clearInput = () => {
    setEmail("");
    setPassword("");
  };
  const redirect = () => {
    props.history.push("/home");
  };

  const formIssuesFunc = () => {
    setFormIssues("Invalid Email or Password");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    runValidators();
    if (Object.keys(errors).length == 0) {
      setFormErrors({});
      setFormIssues("");
      console.log("login check successful");
      const loginData = { email, password };

      dispatch(startLogin(loginData, clearInput, redirect, formIssuesFunc));
    } else {
      setFormErrors(errors);
    }
  };
  return (
    <div className="loginPage">
      <center>
        <h1>Login Page</h1>
      </center>
      <br />
      <form onSubmit={handleSubmit} className="form-floating">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="Enter your registered email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <br />

        {formErrors.emailError && (
          <p style={{ color: "red" }}>{formErrors.emailError}</p>
        )}
        <br />

        <input
          type="password"
          className="form-control"
          placeholder="Enter the password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <br />
        {formErrors.passwordError && (
          <p style={{ color: "red" }}>{formErrors.passwordError}</p>
        )}
        <br />

        <input type="submit" value="Login" className="btn btn-primary" />
        <br />
        <br />

        {formIssues && <p style={{ color: "red" }}>{formIssues}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
