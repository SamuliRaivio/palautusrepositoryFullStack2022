import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders title", () => {
  const testBlog = {
    title: "test title",
    author: "test author ",
    url: "testi.url.com",
    likes: 1,
  };

  render(<Blog blog={testBlog} />);

  const element = screen.getByText("title: test title author: test author");

  expect(element).toBeDefined();
});

test("renders url, likes and user's first and lastname when view button is pressed", async () => {
  const testUser = { firstname: "Johannes", lastname: "Hakkuumaa", id: "1" };
  const testBlog = {
    title: "test title",
    author: "test author ",
    url: "testi.url.com",
    likes: 1,
    user: testUser,
  };

  render(<Blog blog={testBlog} user={testUser} />);
  const user = userEvent.setup();
  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const element = screen.getByText("url:", { exact: false });

  expect(element).toHaveTextContent("testi.url.com");
  expect(element).toHaveTextContent("1");
  expect(element).toHaveTextContent("Johannes");
  expect(element).toHaveTextContent("Hakkuumaa");
});

test("two clicks on like button calls props function two times", async () => {
  const testUser = { firstname: "Johannes", lastname: "Hakkuumaa", id: "1" };
  const testBlog = {
    title: "test title",
    author: "test author ",
    url: "testi.url.com",
    likes: 1,
    user: testUser,
  };

  const mockHandler = jest.fn();

  render(<Blog blog={testBlog} user={testUser} likeBlog={mockHandler} />);

  const user = userEvent.setup();
  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const likeButton = screen.getByText("like");

  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
