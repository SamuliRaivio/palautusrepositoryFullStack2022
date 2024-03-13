import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

//blog data state management with redux
const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    editBlog(state, action) {
      return (state = state.map((blog) => {
        if (blog.id === action.payload.id) {
          return { ...blog, likes: blog.likes + 1 };
        }
        return blog;
      }));
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { setBlogs, appendBlog, editBlog, deleteBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const likeBlog = (id, blogObject) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, blogObject);
    dispatch(editBlog(updatedBlog));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(deleteBlog(id));
  };
};

export default blogSlice.reducer;
