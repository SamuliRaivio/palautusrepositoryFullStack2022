import { useState } from "react";
import "../App.css";

const Blog = ({ blog, likeBlog, blogToRemove, user }) => {
  const [showAllData, setShowAllData] = useState(false);

  const blogByUser = () => {
    if (blog.user.id === user.id) {
      return true;
    }
    return false;
  };

  /* const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }; */

  const addLike = (event) => {
    event.preventDefault();
    likeBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    });
  };

  const removeBlog = (event) => {
    event.preventDefault();

    if (
      confirm(
        `Are you sure you want to remove ${blog.title} by ${blog.author}?`
      )
    ) {
      blogToRemove(blog.id);
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
            {blogByUser() && <button onClick={removeBlog}>remove</button>}
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Blog;
