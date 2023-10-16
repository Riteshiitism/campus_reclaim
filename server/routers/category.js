const { postitem } = require("../models/category");
const messageschema = require("../models/messages");

// const { requestitem } = require("../models/category");
// const { requireSignin, userMiddleware } = require("../middleware");
const express = require("express");
const router = express.Router();

const SignUp = require("../models/signup");
// const category = require("../models/category");

// routes/api.js

// const Item = require('../models/item');
const multer = require("multer");
// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route for saving form data and files
router.post("/postitem", async (req, res) => {
  console.log(req.body);
  // console.log(req.files);
  try {
    // Create a new item document
    // const newItem = await postitem(req.body);
    const newItem = await postitem.create({
      name:req.body.name,
      description:req.body.description,
      type:req.body.type,
      question:req.body.question,
      createdBy:req.body.createdBy
  })
    // Save the item to the database
    var result = await newItem.save();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving item" });
  }
});

// router.post("/postitem", uploadS3.array("itemPictures") ,async (req, res) => {
// console.log(req)
// console.log(req.body);
// console.log("Hitted the POST successfully ");
// console.log(req.body);
// try {
//   console.log("try");
//   const { name, description, question, type } = req.body;
//   console.log(req.files);

//   // var itemPictures = [];
//   // if (req.files.length > 0) {
//   //   itemPictures = req.files.map((file) => {
//   //     return { img: file.key };
//   //   });
//   // }

//   //Saving data to db

//   const newPost = await postitem.create({
//     name: name,
//     description: description,
//     question: question,
//     type: type,
//     createdBy: req.body.createdBy,
//     // itemPictures: itemPictures,
//   });
//   // newPost.save((error, item) => {
//   //   if (error) return res.status(400).json({ error });
//   //   if (item) return res.status(201).json({ item });
//   // });
//   res.send(newPost);
// } catch (err) {
//   console.log("Error");
//   res.status(401).json({
//     "Message is": err.message,
//   });
// }
//   }
// );

router.get("/getitem", async (req, res) => {
  try {
    let result = await postitem.find({});
    // console.log(result);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

router.get("/item/:id", async (req, res) => {
  const { id } = req.params;

  // res.send(id);

  try {
    const result = await postitem.find({ _id: id });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(500).send({ error: "item not found" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }

  // console.log(id)
  // postitem.find({ _id: id }).exec((err, item) => {
  //   if (err) return res.status(400).json({ Error: err });
  //   // console.log(item)
  //   messageschema.find({ itemId: item[0]._id }).exec((err, answers) => {
  //     if (err) return res.status(400).json({ Error: err });

  //     // console.log(answers)
  //     res.status(200).json({
  //       Item: item,
  //       Answers: answers,
  //     });
  //   });
  // });
});
// http://localhost:/5000/answers
router.get("/answers/:id", async (req, res) => {
  const { id } = req.params;
  // res.send(id);
  try {
    const result = await messageschema.find({ itemId: id });
    // console.log(result);
    // if (result.length) {
    //   res.status(200).send(result);
    // } else {
    //   res.status(500).send({ error: "item not found" });
    // }
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post("/edititem", async (req, res) => {
  const { id, name, description, question, type, createdBy } = req.body;
  // console.log(req.files);
  // console.log(req.body)
  // console.log(id)
  // console.log(olditemPictures);

  // var itemPictures = [];
  // if (req.files.length > 0) {
  //   itemPictures = req.files.map((file) => {
  //     return { img: file.filename };
  //   });
  // }
  let item = {
    name: name,
    description: description,
    type: type,
    question: question,
    createdBy: createdBy,
  };
  // if (olditemPictures) {
  //   console.log("Old one");
  //   let itemPictures = [];
  //   itemPictures = olditemPictures.map((pic) => {
  //     return { img: pic };
  //   });
  //   item.itemPictures = itemPictures;
  // } else {
  //   console.log("New one ", itemPictures);
  //   item.itemPictures = itemPictures;
  // }
  // console.log(item)
  try {
    const updateItem = await postitem.findOneAndUpdate({ _id: id }, item, {
      new: true,
    });
    if (updateItem) {
      res.status(200).send(updateItem);
    } else {
      res.status(500).send({ error: "item not found" });
    }
  } catch (err) {
    res.status(404).send({ error: err });
  }
});

router.post("/deleteitem", async (req, res) => {
  console.log(req.body);
  const item_id = req.body.id;
  console.log("Item id is :", item_id);

  try {
    const deleteitem = await postitem.findOneAndDelete({ _id: item_id });
    if (deleteitem) {
      res.status(200).send(deleteitem);
    } else {
      res.status(500).send({ err: "no item found" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }

  // const deletemsgs = await messageschema.deleteMany({ itemId: item_id });
});

router.get("/getnumber/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Id is :", id);
  try {
    const result = await SignUp.find({ _id: id });
    // const number = result[0].number;

    if (result) {
      res.status(200).json({
        Number: result[0].number,
      });
    } else res.send({ message: "mobile no. is not available" });
  } catch (err) {
    res.send(err);
  }
});

// router.get("/getquestion/:id", (req, res) => {
//   const { id } = req.params;
//   console.log("Id is :", id);
//   postitem.find({ _id: id }).exec((err, item) => {
//     if (err) return res.status(400).json({ Error: err });

//     // console.log(item)
//     // console.log(item[0].createdBy)
//     const createdBy = item[0].createdBy;
//     SignUp.find({ _id: createdBy }).exec((err, user) => {
//       res.status(200).json({
//         Question: user[0].number,
//       });
//     });
//   });
// });

router.post("/submitAnswer", async (req, res) => {
  console.log(req.body);
  const { itemId, question, answer, givenBy, belongsTo } = req.body;

  const newmessage = await messageschema.create({
    itemId: itemId,
    belongsTo: belongsTo,
    question: question,
    answer: answer,
    givenBy: givenBy,
  });

  try {
    const response = newmessage.save();
    if (response) res.status(200).send(response);
    else res.status(500).send({ error: "failed to send message" });
  } catch (err) {
    res.status(404).send({ error: err });
  }
});

router.get("/myresponses/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Used Id is :", id);
  try {
    const result = await messageschema.find({ givenBy: id });
    if (result) res.status(200).send(result);
    else res.status(200).send({ message: "no any response" });
  } catch (err) {
    res.status(404).send({ error: err });
  }
});

router.get("/mylistings/:id", async (req, res) => {
  const { id } = req.params;
  // console.log("Used Id is :", id);

  try {
    let product = await postitem.find({ createdBy: id });
    // console.log(product);
    res.send(product);
  } catch (err) {
    res.send({ error: err });
  }
});

router.post("/confirmResponse/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.body);

  try {
    const updatedMessage = await messageschema.updateOne(
      { _id: id },
      { $set: { response: req.body.response } },
      { upsert: false }
    );
    // console.log(updatedMessage);

    if (updatedMessage.modifiedCount > 0) {
      // The update was successful
      res.status(200).json({ msg: "Updated" });
    } else {
      // No documents matched the update criteria
      res.status(404).json({ msg: "No matching document found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});


module.exports = router;
