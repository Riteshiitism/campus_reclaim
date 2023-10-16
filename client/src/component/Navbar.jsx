import React from "react";
// import { setConstraint } from "../constraints";


import { Button } from "react-bootstrap";
import "../css/Navbar.css";
import axios from "axios";
import PostItem from "./PostItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profile_icon from "../img/profile-icon.png";
// import { Dropdown } from "react-bootstrap";
import Login from "./Login";
import Found_item from "./FoundItem";
import { useNavigate } from "react-router-dom";
function Navbar() {
  let user = window.localStorage.getItem('lfsuserid');
  // token = true;
  // console.log(props)
  // console.log("Status :", LOGGED_IN)
  // useEffect(()=>{
  //   axios({
  //     url:'checktoken',
  //     method:"POST",
  //     headers:{
  //       Authorization: token ? `Bearer ${token}` : "",
  //     },
  //   })
  //   .then((res)=>{
  //     console.log(res)
  //   })
  //   .catch((err)=>{
  //     console.log("400 : ",err)
  //   })
  // },[])
  const signout = () => {
    // constraint.LOGGED_IN = false;
    // setConstraint(false);

    console.log("Signed out !");
    axios({
      url: "http://localhost:5000/signout",
      method: "POST",
      headers: {
        // Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then(localStorage.removeItem('lfsuserid'))
      .catch((error) => {
        console.log(error);
        // console.log("Error occured");
      });
  };

  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate('/postitem')
  }
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <a style={{ textDecoration: "none", color: "white" }} href="/">
            <h2>Lost and Found</h2>
          </a>
        </div>

        <div
          style={user ? { display: "none" } : {}}
          id="login"
          className="signin"
        >
          <ul>
            <a
              id="a"
              style={{ textDecoration: "none", color: "white" }}
              href="/signup"
            >
              Sign-up
            </a>
          </ul>
          <ul>
            <a
              id="a"
              style={{ textDecoration: "none", color: "white" }}
              href="/login"
            >
              Log-in
            </a>
          </ul>
        </div>
        <div style={user ? {} : { display: "none" }} className="postsignin">
          <Button variant="primary" onClick={handleClick}>
            Post Item
          </Button>
          <ul>
            <a style={{ textDecoration: "none", color: "white" }} href="/feed">
              Feed
            </a>
            {/* {props.name} */}
            <a
              style={{ textDecoration: "none", color: "white" }}
              href="/responses"
            >
              Responses
            </a>
            <a
              style={{ textDecoration: "none", color: "white" }}
              href="/mylistings"
            >
              My Listings
            </a>
            <a
              style={{ textDecoration: "none", color: "white" }}
              onClick={signout}
              href="/login"
            >
              Sign-out
            </a>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
