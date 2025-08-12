import Header from "./Movies/Header";
import MoviesContainerPage from "./Movies/MovieContainerPage";

const Home = () => {
  return (
    <>
      <Header />

      <section className="mt-[10rem]">
        <MoviesContainerPage />
      </section>
    </>
  );
};

export default Home;