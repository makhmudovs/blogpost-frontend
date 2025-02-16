import React, { useState } from "react";

interface BlogItems {
  author: string;
  id: string;
  likes: number;
  title: string;
  url: string;
}

interface BlogProps {
  blog: BlogItems;
  updateLike: (id: string, likes: number) => void;
  deleteBlog: (id: string) => void;
  // user:
}

const Blog: React.FC<BlogProps> = ({ blog, updateLike, deleteBlog }) => {
  const [expanded, setExpand] = useState(false);
  const [likeBtnDisabled, setLikeBtnDisabled] = useState(false);

  const toggleExpand = () => {
    setExpand(!expanded);
  };
  let user;
  if (localStorage.getItem("loggedBlogappUser")) {
    user = JSON.parse(localStorage.getItem("loggedBlogappUser"));
  }

  return (
    <div className="p-6 mb-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <h4 className="text-2xl font-light dark:text-white">
          {blog.title} by {"-"} {blog.author}
          {"."}
        </h4>
        <button
          onClick={toggleExpand}
          type="button"
          className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {expanded ? "Hide" : "Details"}
        </button>
      </div>
      <div data-testid="details-parent" className={expanded ? "" : "hidden"}>
        <p className="text-lg font-light text-gray-900 dark:text-white">
          Title: <span className="font-bold">{blog.title}</span>
        </p>
        <p className="text-lg font-light text-gray-900 dark:text-white">
          Author: <span className="font-bold">{blog.author}</span>
        </p>
        <div className="flex items-center gap-5">
          <p className="text-lg font-light text-gray-900 dark:text-white">
            Likes: <span className="font-bold">{blog.likes}</span>
          </p>
          <button
            onClick={() => {
              updateLike(blog.id, blog.likes);
              setLikeBtnDisabled(true);
              setTimeout(() => {
                setLikeBtnDisabled(false);
              }, 3000);
            }}
            disabled={likeBtnDisabled}
            type="button"
            className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
            </svg>
            <span className="sr-only">Icon description</span>
          </button>
        </div>
        <p className="text-lg font-light text-gray-900 dark:text-white">
          Url:{" "}
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            {blog.url}
          </a>
        </p>

        {user && user.name === blog.author ? (
          <button
            onClick={() => {
              deleteBlog(blog.id);
            }}
            type="button"
            className="mt-2 cursor-pointer text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Delete blog
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Blog;
