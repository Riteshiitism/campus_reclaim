// import React, { useEffect, useState } from "react";
// import { setConstraint } from "../constraints";
// import Navbar from "../component/Navbar";
// import "../css/item_card.css";
// import "../css/mylisting.css";
// import Axios from "axios";
// import { Card, Col, Container, Row, Badge } from "react-bootstrap";

// export default function Feed() {

//   setConstraint(true);

//   const [item, setitem] = useState('');
//   const [Found_item, setFound_item] = useState();
// //   const ReadMore = ({ children }) => {
// //     const text = children;
// //     const [isReadMore, setIsReadMore] = useState(true);
// //     const toggleReadMore = () => {
// //       setIsReadMore(!isReadMore);
// //     };
// //     return (
// //       <p className="text">
// //         {isReadMore ? text.slice(0, 15) : text}
// //         <span onClick={toggleReadMore} className="read-or-hide">
// //           {isReadMore ? "...." : " show less"}
// //         </span>
// //       </p>
// //     );
// //   };
//   useEffect(() => {
//     // console.log("Test");
//     // let tmpId = "6515e0c83a5fd3fc26daceda"
//     Axios({
//       // url: `https://lfs-backend.herokuapp.com/mylistings/${JSON.parse(localStorage.getItem("user"))._id}`,
//       url: `http://localhost:5000/mylistings/6515e0c83a5fd3fc26daceda`,
//       method: "GET",
//     })
//       .then((response) => {
//         // console.log(response.data.postitems);
//         console.log(response);
//         let data = response.data;
//         console.log(response.data);

//         let items = [];
//         data.map((item)=>{
//             items.push(item);
//         });

//         setitem(response);

//         // let items = [];
//         // let Found_items = [];
//         // data.reverse().map((item) => {
//         //   let created_date = new Date(item.createdAt);
//         //   // console.log(date.toString());
//         //   let createdAt =
//         //     created_date.getDate() +
//         //     "/" +
//         //     created_date.getMonth() +
//         //     "/" +
//         //     created_date.getFullYear() +
//         //     " " +
//         //     created_date.getHours() +
//         //     ":" +
//         //     created_date.getMinutes();
//         //   items.push(
//         //     <a href={`/${item.name}?cid=${item._id}&type=${item.type}/true`}>
//         //       <Col key={item.name} style={{ marginTop: "2%" }} md={3}>
//         //         <Card bsPrefix="item-card" style={{ maxHeight: "465px" }}>
//         //           <Card.Img
//         //             variant="top"
//         //             src={`https://lost-and-found-system.s3.amazonaws.com/${item.itemPictures[0].img}`}
//         //           />
//         //           <Card.Body bsPrefix="card-body">
//         //             {item.status ? (
//         //               <>
//         //                 {" "}
//         //                 <Badge pill variant="success">
//         //                   Active
//         //                 </Badge>
//         //               </>
//         //             ) : (
//         //               <>
//         //                 <Badge pill variant="secondary">
//         //                   Inactive
//         //                 </Badge>
//         //               </>
//         //             )}
//         //             <Card.Title>Item :{item.name}</Card.Title>
//         //             {item.description ? (
//         //               <Card.Text>
//         //                 Description :<ReadMore>{item.description}</ReadMore>
//         //               </Card.Text>
//         //             ) : (
//         //               ""
//         //             )}
//         //             <Card.Text>Type : {item.type}</Card.Text>
//         //             <Card.Text>Created at : {createdAt}</Card.Text>
//         //           </Card.Body>
//         //         </Card>
//         //       </Col>
//         //     </a>
//         //   );
//         // });
//         // setitem(items);
//         // setFound_item(Found_items);
//       })
//       .catch((err) => {
//         console.log("Error :", err);
//       });
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       <div className="listing-title">
//         <h2>My Listings</h2>
//         <div className="title-border"></div>
//       </div>
//       <div>
//         <Container fluid>
//           <Row>{item}</Row>
//         </Container>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { setConstraint } from "../constraints";
import Navbar from "../component/Navbar";
import "../css/item_card.css";
import "../css/mylisting.css";
import Axios from "axios";
import { Card, Col, Container, Row, Badge } from "react-bootstrap";

export default function Feed() {
  setConstraint(true);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

//   const timestamp = 1695932616371; // Replace this with your timestamp
//   const date = new Date(timestamp);

  // Format the date and time
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // second: "numeric",
    // timeZoneName: "short",
  };
//   const formattedDate = date.toLocaleDateString(undefined, options);

//   console.log(formattedDate); // Output will be something like "October 28, 2023, 14:36:56 UTC"
  const id = localStorage.getItem('lfsuserid');
  useEffect(() => {
    Axios.get("http://localhost:5000/mylistings/"+id)
      .then((response) => {
        setLoading(false);
        const data = response.data;
        const itemsData = data.map((item) => ({
          _id: item._id,
          name: item.name,
          description: item.description,
          type: item.type,
          status: item.status,
          createdAt: new Date(item.createdAt).toLocaleDateString(undefined, options), // Format date and time
          //   itemPictures: item.itemPictures,
        }));
        setItems(itemsData);
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error:", err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="listing-title">
        <h2>My Listings</h2>
        <div className="title-border"></div>
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Container fluid>
            <Row>
              {items.map((item) => (
                <Col key={item._id} style={{ marginTop: "2%" }} md={3}>
                  <Card bsPrefix="item-card" style={{ maxHeight: "465px" }}>
                    {/* <Card.Img
                      variant="top"
                      src={`https://lost-and-found-system.s3.amazonaws.com/${item.itemPictures[0].img}`}
                    /> */}
                    <Card.Img
                      variant="top"
                      src={`https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg`}
                    />
                    <Card.Body bsPrefix="card-body">
                      {item.status ? (
                        <>
                          {" "}
                          <Badge pill variant="success">
                            Active
                          </Badge>
                        </>
                      ) : (
                        <>
                          <Badge pill variant="secondary">
                            Inactive
                          </Badge>
                        </>
                      )}
                      
                      <Card.Title> <a href={`/itempage/${item._id}?name=${item.name}&type=${item.type}/true`}>Item:{item.name}</a></Card.Title>
                      {item.description ? (
                        <Card.Text>Description: {item.description}</Card.Text>
                      ) : (
                        ""
                      )}
                      <Card.Text>Type: {item.type}</Card.Text>
                      <Card.Text>Created at: {item.createdAt}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
}
