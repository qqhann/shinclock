import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4">
      <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link to="/">
            <h1 className="text-3xl">ShinClock</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};
