const mongoose = require("mongoose");


const pictureSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

const CategorySchema = new mongoose.Schema(
  {
    
    description: {
      type: String,
      // required: false,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    itemPictures: [pictureSchema],
    question: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      // default: true,
    },
    createdBy: {
      type:String,
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "SignUpSchema",
      required: true,
    },
    createdAt:{
        type:Number
    },
    updatedAt:{
        type:Number
    }
  },
  {
    timestamps: {
      currentTime: () => Date.now()
    },
  }
);

const postitem = mongoose.model("PostItem", CategorySchema);
// const requestitem=mongoose.model('RequestItem',CategorySchema)
module.exports = {
  postitem: postitem,
};
