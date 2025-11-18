import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();

  return (
    <div className="container mx-auto py-10 px-5 md:px-20">
      <div className="flex flex-col items-center">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-100 mb-8">
          All Movies <span className="text-teal-400">({movies?.length || 0})</span>
        </h1>

        {/* Movie Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies?.map((movie) => (
            <div
              key={movie._id}
              className="bg-gray-800 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all overflow-hidden flex flex-col border border-gray-700"
            >
              <img
                src={movie.image}
                alt={movie.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-bold text-xl text-white">{movie.name}</h2>
                <p className="text-gray-300 text-sm mt-2 line-clamp-3">
                  {movie.detail}
                </p>
              </div>
              <div className="p-4 mt-auto">
                <Link
                  to={`/admin/movies/update/${movie._id}`}
                  className="w-full inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold text-center py-2 rounded transition-all"
                >
                  Update Movie
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* If No Movies Found */}
        {movies?.length === 0 && (
          <p className="text-gray-400 italic mt-8">No movies available</p>
        )}
      </div>
    </div>
  );
};

export default AdminMoviesList;
