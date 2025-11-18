import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MovieCard = ({ movie }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div key={movie._id} className="relative group m-8">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={movie.image}
          alt={movie.name}
          className="w-80 h-80 rounded m-0 p-0 transition duration-300 ease-in-out transform group-hover:opacity-50"
        />
      </Link>

      <p
        className={`absolute top-[85%] left-8 right-0 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 
          ${darkMode ? "text-white" : "text-black"}`}
      >
        {movie.name}
      </p>

      <div
        className={`absolute inset-0 rounded transition-colors duration-300 
          group-hover:bg-black group-hover:opacity-20 ${darkMode ? "bg-gray-900" : "bg-transparent"}`}
      ></div>
    </div>
  );
};

export default React.memo(MovieCard);
