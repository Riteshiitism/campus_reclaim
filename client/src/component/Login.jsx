import React, { useState } from "react";
import "../css/newSignup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import { Spinner } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  let [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // console.log("in");
    setloading(true);
    var payload = {
      email: email,
      password: password,
    };
    axios({
      url: "http://localhost:5000/auth/login",
      method: "POST",
      data: payload,
    })
      .then((response) => {
        // console.log("Response is :", response);
        localStorage.setItem("lfsuserid",response.data._id);
        // if (response.data.user) {
        //   Authentication done.
        //   setuser_info(response.data.user);
        //   localStorage.setItem("token", response.data.jwt_token);
        //   console.log(response.data.user)
        //   localStorage.setItem("user", JSON.stringify(response.data.user));
        //   history.push({ pathname: "/feed", user: response.data.user });
        // } else {
        //   setinfo(response.data);
        // }
        // console.log("Response :",response)
        navigate('/feed');
      })
      .catch((error) => {
        setloading(false);
        console.log(error);
        console.log("Error occured");
      });
  };

  // function login() {
  //   setloading(true);
  //   var payload = {
  //     email: document.getElementById("email").value,
  //     password: document.getElementById("password").value,
  //   };
  //   axios({
  //     url: "http://localhost:5000/login",
  //     method: "POST",
  //     data: payload,
  //   })
  //     .then((response) => {
  //       console.log("Response is :", response);
  //       if (response.data.user) {
  //         //Authentication done.
  //         setuser_info(response.data.user);
  //         localStorage.setItem("token", response.data.jwt_token);
  //         // console.log(response.data.user)
  //         localStorage.setItem("user", JSON.stringify(response.data.user));
  //         // history.push({ pathname: "/feed", user: response.data.user });
  //       } else {
  //         setinfo(response.data);
  //       }
  //       // console.log("Response :",response)
  //     })
  //     .catch((error) => {
  //       setloading(false);
  //       console.log(error);
  //       console.log("Error occured");
  //     });

  // }

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <form className="Box-1 login">
          <h1>Log in</h1>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email id"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" className="submit" onClick={handleLogin}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="sr-only">Loading...</span>
              </>
            ) : (
              <>Submit</>
            )}
          </button>
          <p style={{ color: "white" }}>
            Don't have an account?{" "}
            <a style={{ color: "black" }} href="/signup">
              Click here
            </a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
