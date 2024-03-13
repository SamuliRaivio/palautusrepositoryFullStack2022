import { useState } from "react";
import "../App.css";
import { useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const [showAllData, setShowAllData] = useState(false);

  const blogByUser = () => {
    if (blog.user.id === user.id) {
      return true;
    }
    return false;
  };

  const addLike = (event) => {
    event.preventDefault();
    const likedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    dispatch(likeBlog(blog.id, likedBlog));
  };

  const deleteBlog = (event) => {
    event.preventDefault();

    const confirmMessage = `Are you sure you want to remove ${blog.title} by ${blog.author}?`;
    const notificationMessage = `${blog.title} by ${blog.author} removed`;
    if (confirm(confirmMessage)) {
      try {
        dispatch(removeBlog(blog.id));
        dispatch(setNotification("success", notificationMessage));
      } catch (error) {
        console.log(error);
        dispatch(setNotification("error", error.response.data.error));
      }
    }
  };

  return (
    <div className="blogStyle">
      <div style={{ display: "" }}>
        title: {blog.title} author: {blog.author}
        {!showAllData && (
          <button onClick={() => setShowAllData(true)}>view</button>
        )}
        {showAllData && (
          <button onClick={() => setShowAllData(false)}>hide</button>
        )}
        {showAllData && (
          <div>
            url: {blog.url} <br />
            likes: {blog.likes} <button onClick={addLike}>like</button> <br />
            user: {blog.user.firstname} {blog.user.lastname} <br />
            {blogByUser() && <button onClick={deleteBlog}>remove</button>}
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Blog;
