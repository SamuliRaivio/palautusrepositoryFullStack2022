import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ user, createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
      userId: user.id,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Title"
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          URL:
          <input
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

//määritellään propsit pakollisiksi
BlogForm.propTypes = {
  user: PropTypes.object.isRequired,
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
