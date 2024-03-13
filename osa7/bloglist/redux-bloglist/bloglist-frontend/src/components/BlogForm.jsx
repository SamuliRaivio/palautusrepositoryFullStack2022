import { useRef, useState } from "react";
import PropTypes from "prop-types";
import Togglable from "../components/Togglable";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { createBlog, initializeBlogs } from "../reducers/blogReducer";

const BlogForm = ({ user }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const blogFormRef = useRef();

  const addBlog = (event) => {
    event.preventDefault();
    blogFormRef.current.changeVisibility();

    const newBlog = { title: title, author: author, url: url, userId: user.id };

    try {
      dispatch(createBlog(newBlog));
      dispatch(
        setNotification(
          "success",
          `${newBlog.title} by ${newBlog.author} added`
        )
      );
    } catch (error) {
      console.log(error);
      dispatch(setNotification("error", error.response.data.error));
    }

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input
              id="title"
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
              placeholder="write title here"
            ></input>
          </div>
          <div>
            author:
            <input
              id="author"
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
              placeholder="write author here"
            ></input>
          </div>
          <div>
            URL:
            <input
              id="url"
              type="text"
              value={url}
              name="URL"
              onChange={({ target }) => setUrl(target.value)}
              placeholder="write url here"
            ></input>
          </div>
          <button id="add-button" type="submit">
            Add
          </button>
        </form>
      </Togglable>
    </div>
  );
};

//määritellään propsit pakollisiksi
BlogForm.propTypes = {
  user: PropTypes.object.isRequired,
};

export default BlogForm;
