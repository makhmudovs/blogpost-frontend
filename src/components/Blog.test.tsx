import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

describe("<Blog/>", () => {
  test("the blog renders the blog title and author,but does not render URL/likes by default", () => {
    const blog = {
      author: "Testbekjon",
      id: "12chjabchva",
      likes: 12,
      title: "Blog by Testbekjon",
      url: "testbekjon.com",
    };

    const updateLike = (id: string, likes: number) => {
      return { id, likes };
    };
    const deleteBlog = (id: string) => {
      return { id };
    };

    render(
      <Blog blog={blog} updateLike={updateLike} deleteBlog={deleteBlog} />
    );

    const author = screen.getByText("Testbekjon");
    const title = screen.getByText("Blog by Testbekjon");
    const detailsParent = screen.getByTestId("details-parent");
    expect(author).toBeDefined();
    expect(title).toBeDefined();
    expect(detailsParent).toHaveProperty("className", "hidden");
  });

  test("URL/likes are shown when button gets clicked", async () => {
    const blog = {
      author: "Testbekjon",
      id: "12chjabchva",
      likes: 12,
      title: "Blog by Testbekjon",
      url: "testbekjon.com",
    };

    const updateLike = (id: string, likes: number) => {
      return { id, likes };
    };
    const deleteBlog = (id: string) => {
      return { id };
    };

    render(
      <Blog blog={blog} updateLike={updateLike} deleteBlog={deleteBlog} />
    );
    const user = userEvent.setup();
    const button = screen.getByText("Details");

    await user.click(button);
    const detailsParent = screen.getByTestId("details-parent");
    expect(detailsParent).toHaveProperty("className", "");
  });
});
