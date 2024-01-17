import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

test("Form calls props function with correct information when new blog is created", async () => {
  const user = userEvent.setup();
  const testUser = { firstname: "Johannes", lastname: "Hakkuumaa", id: "1" };
  const createBlog = jest.fn();

  render(<BlogForm user={testUser} createBlog={createBlog} />);

  const titleInput = screen.getByPlaceholderText("write title here");
  const authorInput = screen.getByPlaceholderText("write author here");
  const urlInput = screen.getByPlaceholderText("write url here");

  const submitButton = screen.getByText("Add");

  await user.type(titleInput, "test title");
  await user.type(authorInput, "test author");
  await user.type(urlInput, "test url");
  await user.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("test title");
  expect(createBlog.mock.calls[0][0].author).toBe("test author");
  expect(createBlog.mock.calls[0][0].url).toBe("test url");
});
