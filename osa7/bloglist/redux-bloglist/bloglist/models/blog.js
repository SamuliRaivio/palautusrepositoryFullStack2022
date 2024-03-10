//blog.js sisältää bloggaus-olin skeeman määrittelyn
// sekä sen exporttauksen muiden osien käyttöön
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  url: { type: String, required: true },
  likes: Number,
});

//muutetaan mongongoosen "_id"-objecti "id"-merkkijonoksi
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
