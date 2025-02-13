import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

interface newBlog {
  title: string;
  author: string;
  url: string;
  likes:number,
}

const create = async (newObject: newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export default { getAll, create, setToken };
