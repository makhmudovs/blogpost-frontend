import React, { ReactNode, useState } from "react";

interface ToggleableProps {
  children: ReactNode;
}

const Toggleable: React.FC<ToggleableProps> = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);
  return (
    <>
      <div className="flex">
        <button
          type="button"
          onClick={toggleVisibility}
          className={`${
            visible ? "hidden" : ""
          } py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
        >
          Show form
        </button>
        <button
          type="button"
          onClick={toggleVisibility}
          className={`${
            visible ? "" : "hidden"
          } focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900`}
        >
          Hide form
        </button>
      </div>
      <div className={visible ? "" : "hidden"}>{props.children}</div>
    </>
  );
};

export default Toggleable;
