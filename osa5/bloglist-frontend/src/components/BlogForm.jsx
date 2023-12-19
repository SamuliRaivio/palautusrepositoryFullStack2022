const BlogForm = ({ title, setTitle, url, setUrl, addBlog }) => (
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

export default BlogForm;
