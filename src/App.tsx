import { useState, useEffect, FormEvent } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [msgType, setMsgType] = useState("info");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);

  const getBlogs = () => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user["token"]);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error("handle login: ", err);
      setMessage("Wrong username or password");
      setMsgType("danger");
      setTimeout(() => {
        setMessage(null);
        setMsgType("info");
      }, 5000);
    }
  };

  const handleNewBlog = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const req = await blogService.create({
        title,
        author,
        url,
        likes,
      });
      console.log("new blog req ", req);
      setMessage(`New blog ${req.title} created by ${req.author}`);
      setMsgType('success');
      setTitle('');
      setAuthor('');
      setUrl('');
      setLikes('');
      setTimeout(() => {
        setMessage(null);
        setMsgType('info');
      }, 3000);
      getBlogs();
    } catch (err) {
      console.error("handle login: ", err);
      setMessage("Cannot create blog");
      setMsgType('danger');
      setTimeout(() => {
        setMessage(null);
        setMsgType('info');
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
      <section className="bg-white dark:bg-gray-900">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Login to view Blogs
        </h2>
        <form onSubmit={handleLogin} className="space-y-8">
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light outline-none"
              placeholder="Your username"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light outline-none"
              placeholder="Your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>
      </section>
    );
  };

  const blogForm = () => {
    return (
      <section className="bg-white dark:bg-gray-900 mt-4">
        <h2 className="mb-4 text-2xl tracking-tight font-extrabold text-left text-gray-900 dark:text-white">
          Create a new Blog
        </h2>
        <form onSubmit={handleNewBlog} className="space-y-8">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Title
            </label>
            <input
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
  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  return (
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <Notification message={message} msgType={msgType} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          
            

            <div className="flex items-center justify-end gap-2">
              <h3 className="text-2xl  mb-4">
                <span className="font-bold underline">{user["name"]}</span>{" "}
                logged in
              </h3>
              <button
                type="button"
                onClick={() => {
                  window.localStorage.removeItem("loggedBlogappUser");
                  setUser(null);
                }}
                className="cursor-pointer focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Log out
              </button>
            </div>
          
          {blogForm()}
          <h1 className="text-3xl font-bold underline my-6">Blogs</h1>
          {blogs.map((blog) => (
            <Blog key={blog["id"]} blog={blog} />
          ))}
          <div className="my-4"></div>
        </div>
      )}
    </div>
  );
};

export default App;
