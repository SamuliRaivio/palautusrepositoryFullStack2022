const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author.firstname} {blog.author.lastname}
  </div>
);

export default Blog;
