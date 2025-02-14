import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Toggleable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import SortLikes from "./components/SortLikes";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [filterByLikes, setFilterByLikes] = useState(false);

  const getBlogs = () => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  interface Creds {
    username: string;
    password: string;
  }

  const handleLogin = async (creds: Creds) => {
    try {
      const user = await loginService.login(creds);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user["token"]);
      setUser(user);
    } catch (err) {
      console.error("handle login: ", err);
      Swal.fire({
        width: 500,
        heightAuto: true,
        position: "top-end",
        icon: "error",
        title: "Oops...",
        text: `Cannot login`,
      });
    }
  };

  interface newBlogTypes {
    title: string;
    author: string;
    url: string;
    likes: number;
  }
  const handleNewBlog = async (newBlog: newBlogTypes) => {
    try {
      const req = await blogService.create(newBlog);
      console.log("new blog req ", req);
      Swal.fire({
        width: 500,
        heightAuto: true,
        position: "top-end",
        icon: "success",
        title: "Success...",
        text: `New blog added`,
      });
      getBlogs();
    } catch (err) {
      console.error("handle login: ", err);
      Swal.fire({
        width: 500,
        heightAuto: true,
        position: "top-end",
        icon: "error",
        title: "Oops...",
        text: `Cannot add new blog`,
      });
    }
  };

  const updateLike = async (id: string, likes: number) => {
    try {
      const req = await blogService.update(id, { likes: likes + 1 });
      console.log("new blog req ", req);
      Swal.fire({
        width: 500,
        heightAuto: true,
        position: "top-end",
        icon: "success",
        title: "Success...",
        text: `Liked successfully`,
      });
      getBlogs();
    } catch (err) {
      console.error("handle likes: ", err);
      Swal.fire({
        width: 500,
        heightAuto: true,
        position: "top-end",
        icon: "error",
        title: "Oops...",
        text: `Error occured`,
      });
    }
  };

  const deleteBlog = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const req = await blogService.deleteBlog(id);
        console.log("delted blog req ", req);
        Swal.fire({
          width: 500,
          heightAuto: true,
          position: "top-end",
          icon: "success",
          title: "Success...",
          text: `Deleted successfully`,
        });
        getBlogs();
      } catch (err) {
        console.error("handle delete blog: ", err);
        Swal.fire({
          width: 500,
          heightAuto: true,
          position: "top-end",
          icon: "error",
          title: "Oops...",
          text: `Error occured`,
        });
      }
    }
    {
      return;
    }
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

  const sortedBlogs = filterByLikes
    ? blogs
        .filter((blog) => blog.likes > 0) // Example filter condition: only blogs with likes > 0
        .sort((a, b) => b.likes - a.likes) // Sort in descending order of likes
    : blogs;
  return (
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <div className="flex items-center justify-end gap-2">
            <h3 className="text-2xl  mb-4">
              <span className="font-bold underline">{user["name"]}</span> logged
              in
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
            {/* logout has to be moved into its own component */}
          </div>

          <Toggleable>
            <BlogForm handleNewBlog={handleNewBlog} />
          </Toggleable>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold underline my-6">Blogs</h1>

            <SortLikes
              filterByLikes={filterByLikes}
              setFilterByLikes={setFilterByLikes}
            />
          </div>

          {sortedBlogs.map((blog) => (
            <Blog
              deleteBlog={deleteBlog}
              updateLike={updateLike}
              key={blog["id"]}
              blog={blog}
            />
          ))}
          <div className="my-4"></div>
        </div>
      )}
    </div>
  );
};

export default App;
