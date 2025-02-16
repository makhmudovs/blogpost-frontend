import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const user = userEvent.setup();
  const handleNewBlog = vi.fn();

  render(<BlogForm handleNewBlog={handleNewBlog} />);

  const submitBtn = screen.getByText("Create");

  const titleInput = screen.getByPlaceholderText("Blog Title");
  const authorInput = screen.getByPlaceholderText("Blog Author");
  const urlInput = screen.getByPlaceholderText("Blog URL");
  const likesInput = screen.getByPlaceholderText("0");

  await user.type(titleInput, "Blog by Testbekjon");
  await user.type(authorInput, "Testbekjon");
  await user.type(urlInput, "testbekjon.com");
  await user.type(likesInput, "12");

  await user.click(submitBtn);

  console.log(handleNewBlog.mock.calls);
  expect(handleNewBlog.mock.calls).toHaveLength(1);
});
