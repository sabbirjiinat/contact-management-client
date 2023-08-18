import { Link } from "react-router-dom";
const EmptyMessage = ({ heading, href, title }) => {
  return (
    <div className="h-screen w-full flex flex-col space-y-3 justify-center items-center">
      <h2 className="text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <Link
        className="text-xl font-medium bg-blue-600 px-2 py-1 rounded-md text-gray-100 hover:bg-blue-700"
        to={href}
      >
        {title}
      </Link>
    </div>
  );
};

export default EmptyMessage;
