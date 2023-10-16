import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../css/myresponses.css";
import Axios from "axios";
import { Button, Modal, Badge } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Response() {
  const [responses, setResponses] = useState([]);
  const [showNumber, setShowNumber] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCloseNumber = () => {
    setShowNumber(false);
  };

  const handleShowNumber = (response) => {
    // setSelectedResponse(response);
    // console.log(response.belongsTo);
    Axios.get(`http://localhost:5000/getnumber/${response.belongsTo}`)
      .then((response) => {
        setPhoneNumber(response.data.Number);
        setShowNumber(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let id = localStorage.getItem("lfsuserid");
    console.log(id);
    Axios.get(`http://localhost:5000/myresponses/${id}`)
      .then((res) => {
        const responsesData = res.data.reverse().map((response) => {
          const createdDate = new Date(response.createdAt);
          const date =
            createdDate.getDate() +
            "/" +
            (createdDate.getMonth() + 1) + // Month is zero-based
            "/" +
            createdDate.getFullYear() +
            " " +
            createdDate.getHours() +
            ":" +
            createdDate.getMinutes();
          return (
            <div className="response-card" key={response._id}>
              <h5>
                <span className="attributes">Item ID :</span> {response.itemId}
              </h5>
              <h5>
                <span className="attributes">Question :</span>{" "}
                {response.question}
              </h5>
              <h5>
                <span className="attributes">Your Answer :</span>
                {response.answer}
              </h5>
              <h5>
                <span className="attributes">Time :</span> {date}
              </h5>
              {response.response === "Moderation" ? (
                <h6>
                  <Badge pill variant="primary">
                    Moderation
                  </Badge>
                </h6>
              ) : (
                <h6>
                  {response.response === "Yes" || response.response==="yes" ? (
                    <>
                      <h6>
                        <Badge pill variant="success">
                          Approved
                        </Badge>
                      </h6>
                      <Button
                        className="btn-primary"
                        onClick={() => handleShowNumber(response)}
                      >
                        Show Number
                      </Button>
                    </>
                  ) : (
                    <h6>
                      <Badge pill variant="danger">
                        Oops !!
                      </Badge>
                    </h6>
                  )}
                </h6>
              )}
            </div>
          );
        });
        setResponses(responsesData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // Empty dependency array to run once on component mount

  return (
    <>
      <Navbar />
      <Modal show={showNumber} onHide={handleCloseNumber} backdrop="static">
        <Modal.Body>
          <p>Here is the number: {phoneNumber}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseNumber}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseNumber}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="response-title">
        <h2>Your responses</h2>
        <div className="title-border"></div>
      </div>
      <div className="responses-list">{responses}</div>
      <ToastContainer />
    </>
  );
}

export default Response;
