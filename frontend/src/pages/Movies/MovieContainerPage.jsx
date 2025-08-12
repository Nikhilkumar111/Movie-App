import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../component/SliderUtil";

const MoviesContainerPage = () => {
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();


  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre((prev) => (prev === genreId ? null : genreId)); // toggle genre
  };

  const filteredMovies = newMovies?.filter(
    (movie) => !selectedGenre || movie.genre === selectedGenre
  );

  return (
    <div className="flex flex-col lg:flex-row gap-10 px-6 py-10">
      {/* Left Side - Genre Selector */}
      <aside className="flex flex-wrap lg:flex-col gap-3">
        {genres?.map((genre) => (
          <button
            key={genre._id}
            onClick={() => handleGenreClick(genre._id)}
            className={`px-4 py-2 rounded transition ${
              selectedGenre === genre._id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </aside>

      {/* Right Side - Sliders */}
      <main className="flex-1 flex flex-col gap-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">🎲 Recommended For You</h2>
          <SliderUtil data={randomMovies} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🔥 Top Movies</h2>
          <SliderUtil data={topMovies} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🎬 All Movies</h2>
          {filteredMovies?.length > 0 ? (
            <SliderUtil data={filteredMovies} />
          ) : (
            <p className="text-gray-500">No movies found for this genre.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default MoviesContainerPage;
