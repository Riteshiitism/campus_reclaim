import React, { useState, useEffect } from "react";
import "../css/itempage.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useParams, useLocation } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Modal,
  Form,
  Container,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import lodash from "lodash";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function ItemPage(props) {
  const [confirmation, setConfirmation] = useState(false);
  const [item, setItem] = useState({});
  const [alreadyAnswered, setAlreadyAnswered] = useState(false);
  const [answer, setAnswer] = useState([]);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [validateUser, setValidateUser] = useState(false);
  const [ActivationRequest, setActivationRequest] = useState(false);

  const location = useLocation();
  const search = location.search;
  const parts = search.split("/");
  const current_user = parts[parts.length - 1];

  const navigate = useNavigate();
  //   console.log(useParams());
  const item_id = useParams().itemId;
  //   console.log(item_id);
  //   const item_id = props.location.search.substring(1).split("=")[1].split("&")[0];
  //   console.log( props.location.search);
  //   console.log(item_id);
  //   const current_user = "true";
  //   const item_id = "6515e0c83a5fd3fc26daceda";
  // console.log(current_user);
  useEffect(() => {
    Axios.get("http://localhost:5000/item/" + item_id)
      .then((response) => {
        const data = response.data[0];
        setItem(data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, [item_id]);

  useEffect(() => {
    Axios.get("http://localhost:5000/answers/" + item_id).then((response) => {
      if (response.data.length>0) {
        // console.log(response.data);
        // console.log(response.data.length);
        setAnswer(response.data);
        setAlreadyAnswered(true);
        // console.log({"aln":alreadyAnswered})
      } else {
        setAnswer(response.data);
        setAlreadyAnswered(false);
        // console.log(answer);
        // console.log({"al":alreadyAnswered})
        // console.log("no response yet");
      }
    });
  }, []);
  // console.log({"aln":alreadyAnswered})

  const [itemname, setitemname] = useState(item.name);
  const [description, setdescription] = useState("");
  const [itemquestion, setitemquestion] = useState("");
  const [itemimage, setitemimage] = useState([]);
  const [newitemimage, setnewitemimage] = useState([]);
  const [type, settype] = useState(item.type);

  const handleShowQuestion = () => {
    setShowQuestion(true);
    setConfirmation(false);
  };

  const submitAnswer = () => {
    console.log(answer);

    console.log(localStorage.getItem('lfsuserid'));
    const payload = {
      itemId: item_id,
      question: item.question,
      answer: answer,
      givenBy: localStorage.getItem("lfsuserid"),
      belongsTo: item.createdBy,
    };

    // console.log(payload);
    Axios({
      url: "http://localhost:5000/submitAnswer",
      method: "POST",
      data: payload,
    })
      .then((res) => {
        console.log(res);
        handleCloseQuestion();
        // addToast("Response saved ✔️", {
        //   appearance: "success",
        // });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
    setAnswer("");

    // Close the question modal
    setShowQuestion(false);
    // Clear the answer input field
    setAnswer("");
  };

  const handleShowDelete = () => {
    setShowDelete(true);
  };
  const handleShowEdit = () => {
    setShowEdit(true);
  };

  const deleteItem = () => {
    // Your delete item logic here
    console.log(item_id);

    Axios({
      url: "http://localhost:5000/deleteitem",
      method: "POST",
      data: { id: item_id },
    })
      .then((response) => {
        console.log("Response is :", response);
        navigate("/feed");
      })
      .catch(() => {
        console.log("Error occured");
      });

    // Close the delete confirmation modal
    setShowDelete(false);
    // Redirect to the feed page
    navigate("/feed");
  };

  const submitResponse = (event) => {
    console.log(event.target.id);
    // console.log(answer[0]._id);
    const messageId = answer[0]._id;
    if (event.target.id === "positive") {
      var payload = {
        response: "yes",
      };
    } else {
      var payload = {
        response: "No",
      };
    }
    Axios({
      url: "http://localhost:5000/confirmResponse/" + messageId,
      method: "POST",
      data: payload,
    })
      .then((res) => {
        console.log(res);
        toast("Response saved 👍", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Close after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          appearance: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
    setValidateUser(false);
  };

  const handleCloseActivation = () => {
    setActivationRequest(false);
  };

  const submitActivate = () => {
    setActivationRequest(false);
  };
  const handleConfirmation = () => {
    setConfirmation(true);
  };
  const handleCloseConfirmation = () => {
    setConfirmation(false);
  };

  const handleEdit = () => {
    const payload = {
      name: itemname,
      description: description,
      question: itemquestion,
      type: type,
      id: item_id,
      createdBy: item.createdBy,
    };
    console.log(payload);
    // const info = new FormData();
    // info.append("name", itemname);
    // info.append("description", description);
    // info.append("question", itemquestion);
    // info.append("type", type);
    // info.append("id", item_id);
    // info.append("createdBy", Createdby);
    // // console.log(newitemimage.length)
    // if (newitemimage.length > 0) {
    //   newitemimage.map((itemImage) => {
    //     info.append("itemPictures", itemImage, itemImage.name);
    //   });
    // } else {
    //   console.log("Old one");
    //   itemimage.map((image) => {
    //     console.log(image);
    //     info.append("olditemPictures", image.img);
    //   });
    // }
    Axios({
      url: "http://localhost:5000/edititem",
      method: "POST",
      data: payload,
    })
      .then((res) => {
        console.log(res);
        toast("Item edited✏️ successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Close after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          appearance: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
    setShowEdit(false);
  };
  const handleCloseQuestion = () => {
    setShowQuestion(false);
  };

  // const answer = [];

  return (
    <>
      <Navbar />
      <Container fluid>
        <div className="itempage">
          {/* Render item details here */}
          <Carousel
            autoPlay
            className="carousel"
            style={{ width: "80%" }}
            infiniteLoop
            width="50%"
          >
            {/* {itemimage.map((i) => {
              return (
                <div style={{ border: "2px solid black" }}>
                  <img
                    src={`https://lost-and-found-system.s3.amazonaws.com/${i.img}`}
                    alt="item"
                  />
                </div>
              );
            })} */}
            <div style={{ border: "2px solid black" }}>
              <img
                src={`https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg`}
                alt="item"
              />
            </div>
          </Carousel>
          <div className="itemDescription">
            <h3 className="attributes">
              Item name : <span className="details">{item.name}</span>{" "}
            </h3>
            <hr></hr>
            <h3 className="attributes">
              Item description :{" "}
              <span className="details">{item.description}</span>{" "}
            </h3>
            <hr></hr>
            <h3 className="attributes">
              Item type : <span className="details">{item.type}</span>{" "}
            </h3>
            <hr></hr>
            <h3 className="attributes">
              Status :
              {item.status ? (
                <>
                  <span className="details"> Active</span>
                </>
              ) : (
                <>
                  <span className="details">Inactive</span>
                </>
              )}
            </h3>
            <hr></hr>
            <h6 className="attributes">
              Created at : <span className="details">{item.createdAt}</span>{" "}
            </h6>

            {current_user === "true" ? (
              <div className="ed-button">
                <Button variant="danger" onClick={handleShowDelete}>
                  Delete item
                </Button>
                <Button variant="primary" onClick={handleShowEdit}>
                  Edit item
                </Button>
                {/* {item.status ? (
                  <></>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => setActivationRequest(true)}
                    >
                      Reactivate Item
                    </Button>
                  </>
                )} */}
              </div>
            ) : (
              <div>
                {alreadyAnswered ? (
                  <div className="ed-button">
                    <Button variant="primary" onClick={handleConfirmation}>
                      {item.type === "lost"||item.type==="Lost" ? "Ffound Item" : "Cclaim Item"}
                    </Button>
                  </div>
                  
                ) : (
                  <div className="ed-button">
                    <Button
                      // disabled
                      variant="primary"
                      onClick={handleShowQuestion}
                    >
                      {item.type === "lost"||item.type==="Lost"
                        ? "Found Item"
                        : "Claim Item"}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
      {/* Render authentication and answers */}
      <div>
        {current_user === "true" ? (
          <div>
            <div>
              <h2 className="attributes">Your Question :</h2>
              <h3>{item.question}</h3>
            </div>

            <div>
              <h2 className="attributes">Answers Submitted :</h2>
              {answer.length === 0 ? (
                <h3>No Answers Yet.</h3>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {answer.map((answer) => (
                    <>
                      <div className="responses">
                        <Card border="primary" style={{ width: "18rem" }}>
                          <Card.Body>
                            <Card.Title>Answer : {answer.answer}</Card.Title>
                            {/* <Card.Text>Some quick example</Card.Text> */}
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroupItem>
                              Date : {answer.createdAt}
                            </ListGroupItem>
                            <ListGroupItem>Validate :</ListGroupItem>
                          </ListGroup>
                          {/* <Card.Body>
                                <Card.Link href="#">No</Card.Link>
                                <Card.Link href="#">Yes</Card.Link>
                              </Card.Body> */}
                          <Card.Body>
                            {answer.response === "Moderation" ? (
                              <div className="ed-button">
                                <Button
                                  variant="danger"
                                  id="negative"
                                  onClick={submitResponse}
                                >
                                  No
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={() => setValidateUser(true)}
                                >
                                  Yes
                                </Button>
                              </div>
                            ) : (
                              <p>Already Submitted as "{answer.response}"</p>
                            )}
                          </Card.Body>
                        </Card>
                      </div>
                      {/* <div style={{ display: "flex" }}>
                            <h5>Answer is :</h5>
                            <h5>{answer.answer}</h5>
                          </div> */}
                      {/* <p>Submitted at : {answer.createdAt}</p> */}
                    </>
                  ))}
                </div>
              )}
              {/* <h2>{answers.length}</h2> */}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      {/* Activation confirmation modal */}
      <Modal
        show={ActivationRequest}
        onHide={handleCloseActivation}
        backdrop="static"
      >
        <Modal.Body>
          <p>Are you sure?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseActivation}>
            No
          </Button>
          <Button variant="danger" onClick={submitActivate}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal
        show={showDelete}
        onHide={() => setShowDelete(false)}
        backdrop="static"
      >
        <Modal.Body>
          <p>Are you sure, you want to remove item?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowDelete(false)}>
            No
          </Button>
          <Button variant="danger" onClick={deleteItem}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* edit model */}
      <Modal
        show={showEdit}
        onHide={() => setShowEdit(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Lost item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Item name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item"
                value={itemname}
                onChange={(e) => setitemname(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter a question based on the item</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex:- What is the color of the phone ?"
                value={itemquestion}
                onChange={(e) => setitemquestion(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Item type</Form.Label>
              <Form.Control
                as="select"
                required={true}
                defaultValue="Choose..."
                value={type}
                onChange={(e) => settype(e.target.value)}
              >
                <option>Choose..</option>
                <option value={"Lost"}>Lost It</option>
                <option value={"Found"}>Found It</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              {/* <Form.File
                  type="file"
                  id="formimage"
                  label="Image input"
                  onChange={(e) => {
                    // console.log(e.target.files)
                    let { files } = e.target;
                    lodash.forEach(files, (file) => {
                      // console.log(file)
                      setnewitemimage((item) => [...item, file]);
                    });
                  }}
                  multiple
                /> */}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Validate user confirmation modal */}
      <Modal
        show={validateUser}
        // show={true}
        onHide={() => setValidateUser(false)}
        backdrop="static"
      >
        <Modal.Body>
          <p>Once submitted, you cannot undo this. Are you sure?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setValidateUser(false)}>
            Cancel
          </Button>
          <Button variant="primary" id="positive" onClick={submitResponse}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Question modal */}
      <Modal
        show={confirmation}
        onHide={handleCloseConfirmation}
        backdrop="static"
      >
        <div>
          <Modal.Body>
            <p>Are you sure you want to submit a response? </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseConfirmation}>
              No
            </Button>
            <Button variant="danger" onClick={handleShowQuestion}>
              Yes
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
      <Modal show={showQuestion} onHide={handleCloseQuestion} backdrop="static">
        <div>
          <Modal.Body>
            <Form.Group>
              <Form.Label>{item.question}</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseQuestion}>
              Close
            </Button>
            <Button variant="primary" onClick={submitAnswer}>
              Submit
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      <ToastContainer />
    </>
  );
}

export default ItemPage;
