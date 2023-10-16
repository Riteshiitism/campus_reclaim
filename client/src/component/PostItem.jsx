import React, { useState,useRef } from "react";
import axios from "axios";
import lodash from "lodash";
// import { useToasts } from "react-toast-notifications";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, Spinner, Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

function PostItem() {
  const Navigate = useNavigate();
  const [show, setShow] = useState(true);
  //   const { addToast } = useToasts();
  const token = window.localStorage.getItem("token");
  const [loading, setloading] = useState(false);

  const [itemname, setitemname] = useState("");
  const [description, setdescription] = useState("");
  const [itemquestion, setitemquestion] = useState("");
  const [itemimage, setitemimage] = useState([]);
  const [type, settype] = useState("");
  const fileInputRef = useRef(null);


  // const packFiles = (files) => {
  //   const data = new FormData();

  //   [...files].forEach((file, i) => {
  //     // console.log(files);
  //     data.append(`file-${i}`, file, file.name);
  //   });
  //   return data;
  // };

  const handleSubmit = () => {
    setloading(true);

    if (itemname && description && type) {
      // console.log("Item image : ", itemimage);
      //   const info = new FormData();
      //   info.append("name", itemname);
      //   info.append("description", description);
      //   info.append("question", itemquestion);
      //   info.append("type", type);
      //   itemimage.map((itemImage) => {
      //     info.append("itemPictures", itemImage, itemImage.name);
      //   });


      // if (itemimage.length) {
      //   var data = packFiles(itemimage);
      //   console.log(data);
      // }
      // const newPayload = new FormData();
      // newPayload.append("name", itemname);
      // newPayload.append("description", description);
      // newPayload.append("question", itemquestion);
      // newPayload.append("type", type);
      // console.log(itemimage);
      // Array.from(itemimage).forEach((itemImage, i) => {
      //   newPayload.append(`itemPictures-${i}`, itemImage, itemImage.name);
      // });
      const user = localStorage.getItem('lfsuserid');
      const newPayload = {
        name:itemname,
        description:description,
        type:type,
        question:itemquestion,
        createdBy:user
      }
      // console.log(newPayload);

      axios({
        url: "http://localhost:5000/postitem",
        method: "POST",
        data: newPayload,
      })
        .then((response) => {
          // console.log(response);
          toast("Wohoo 🤩! Item listed successfully.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000, // Close after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setitemname("");
          setdescription("");
          settype("");
          setitemquestion("");
          setitemimage([]);
          // fileInputRef.current.value = '';
          // console.log("Executed");
          Navigate('/feed');
          setloading(false);
          setShow(false);
        })
        .catch((err) => {
          setloading(false);
          console.log(err);
          toast("Oops 😞! Check internet connection or try again later.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000, // Close after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
    } else {
      // console.log("required field missed");
      toast("you missed some required fields", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  return (
    <div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Post item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>
                Item name<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item"
                value={itemname}
                onChange={(e) => setitemname(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Description<span style={{ color: "red" }}>*</span>
              </Form.Label>
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
            {/* <Form.Group>
              <Form.Label>image input</Form.Label>

              <Form.Control
                type="file"
                id="formimage"
                accept="image/*"
                name="itemPictures"
                multiple
                label="Image input"
                ref={fileInputRef}
                // onChange={(e) => setitemimage(e.target.files)}
                onChange={(e) => setitemimage(Array.from(e.target.files))}
              />
            </Form.Group> */}
            <Form.Group>
              <Form.Label>
                Item type<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                as="select"
                required={true}
                defaultValue="Choose..."
                onChange={(e) => settype(e.target.value)}
              >
                <option>Choose..</option>
                <option value={"Lost"}>Lost It</option>
                <option value={"Found"}>Found It</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
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
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default PostItem;
