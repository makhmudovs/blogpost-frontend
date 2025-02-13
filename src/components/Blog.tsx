interface BlogProps {
  author: string;
  id: string;
  likes: number;
  title: string;
  url: string;
}

// :React.FC<BlogProps>
const Blog = ({blog}) => {
  return (
    <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
      <li className="mb-2">{blog.title} {blog.author}</li>
    </ul>
  );
};

export default Blog;
