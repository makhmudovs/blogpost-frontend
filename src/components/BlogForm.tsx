import React, { useState } from "react";

interface BlogItems {
  title: string;
  author: string;
  url: string;
  likes: number;
}

interface BlogProps {
  handleNewBlog: (blog: BlogItems) => void;
}

const BlogForm: React.FC<BlogProps> = ({ handleNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleNewBlog({ title, author, url, likes });
    setTitle("");
    setAuthor("");
    setUrl("");
    setLikes(0);
  };
  return (
    <section className="bg-white dark:bg-gray-900 mt-4">
      <h2 className="mb-4 text-2xl tracking-tight font-extrabold text-left text-gray-900 dark:text-white">
        Create a new Blog
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Title
          </label>
          <input
            placeholder="Blog Title"
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light outline-none"
            required
          />
        </div>
        <div>
          <label
            htmlFor="author"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Author
          </label>
          <input
            placeholder="Blog Author"
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light outline-none"
            required
          />
        </div>
        <div>
          <label
            htmlFor="url"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Url
          </label>
          <input
            placeholder="Blog URL"
            type="text"
            id="url"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light outline-none"
            required
          />
        </div>
        <div>
          <label
            htmlFor="url"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Likes
          </label>
          <input
            placeholder="0"
            type="number"
            id="likes"
            name="likes"
            value={likes}
            onChange={(e) => setLikes(Number(e.target.value))}
            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create
        </button>
      </form>
    </section>
  );
};

export default BlogForm;
