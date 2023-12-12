//blog.js sisältää bloggaus-olin skeeman määrittelyn
// sekä sen exporttauksen muiden osien käyttöön
const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
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
