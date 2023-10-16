import React, { useEffect, useState } from "react";
import { setConstraint } from "../constraints";
import Navbar from "../component/Navbar";
import "../css/feed.css";
import "../css/item_card.css";
import Axios from "axios";
import { Card, Col, Container, Row } from "react-bootstrap";

export default function Feed() {
  setConstraint(true);
  // let user_info;
  const [userId, setuserId] = useState(localStorage.getItem("lfsuserid"));
  const [user_info, setuser_info] = useState({});
  const [item, setitem] = useState([]);
  const [foundItem, setFoundItem] = useState([]);

  useEffect(()=>{
    // console.log(userId);
    Axios({
      url:"http://localhost:5000/auth/user-details/"+userId,
      method:"GET"
    })
    .then((response)=>{
      // console.log(response.data[0].firstname);
      setuser_info(response.data[0]);
    })
  },[]);


  useEffect(() => {
    Axios({
      url: "http://localhost:5000/getitem",
      method: "GET",
    })
      .then((response) => {
        // console.log(response);
        let data = response.data;
        let items = [];
        let foundItems = [];

        data.reverse().forEach((item) => {
          const created_date = new Date(item.createdAt);
          const createdAt = `${created_date.getDate()}/${created_date.getMonth()}/${created_date.getFullYear()} ${created_date.getHours()}:${created_date.getMinutes()}`;

          const userMatches = item.createdBy === userId;
          // console.log(item.createdBy);
          // console.log(userId);
          const card = (
            <a
              href={`/itempage/${item._id}?name=${item.name}&type=${item.type}/${userMatches}`}
            >
              <Col key={item.name} style={{ marginTop: "2%" }} md={3}>
                <Card bsPrefix="item-card">
                  <Card.Img
                    variant="top"
                    src={`https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg`}
                  />
                  <Card.Body bsPrefix="card-body">
                    <Card.Title
                      style={{
                        fontFamily: "'Noto Sans JP', sans-serif",
                        fontWeight: "1.35rem",
                      }}
                    >
                      Item: {item.name}
                    </Card.Title>
                    {item.description && (
                      <Card.Text
                        style={{
                          fontFamily: "'Noto Sans JP', sans-serif",
                          fontSize: "1rem",
                        }}
                      >
                        Description: {item.description}
                      </Card.Text>
                    )}
                    <Card.Text
                      style={{
                        fontFamily: "'Noto Sans JP', sans-serif",
                        fontSize: "1rem",
                      }}
                    >
                      Created at: {createdAt}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </a>
          );

          if (item.type === "lost" || item.type === "Lost") {
            items.push(card);
          } else {
            foundItems.push(card);
          }
        });

        setitem(items);
        setFoundItem(foundItems);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <h2
        style={{ fontFamily: "'Noto Sans JP', sans-serif", marginLeft: "5px" }}
      >
        Welcome {user_info.firstname}👋!
      </h2>
      <Container fluid>
        <h2 style={{ textAlign: "center" }}>Lost items:</h2>
        <div className="title-border"></div>
        <Row>{item}</Row>
      </Container>
      <Container fluid>
        {foundItem.length > 0 && (
          <div>
            <h2 style={{ textAlign: "center" }}>Found items:</h2>
            <div className="title-border"></div>
            <Row>{foundItem}</Row>
          </div>
        )}
      </Container>
    </div>
  );
}
