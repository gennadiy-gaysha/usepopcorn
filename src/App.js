import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import { useEffect, useState } from "react";
import { tempMovieData, tempWatchedData } from "./components/temporaryData";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

const KEY = "66198b53";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("Inception");

  // useEffect(function () {
  //   console.log("Runs after component is mounted");
  // }, []);

  // useEffect(function () {
  //   console.log("Runs after every render");
  // });

  // console.log("Runs during every render");

  // useEffect(
  //   function () {
  //     console.log("Runs after each query state change");
  //   },
  //   [query]
  // );

  // const handleClick = () => {
  //   fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
  //     .then((res) => res.json())
  //     .then((data) => setMovies(data.Search));
  // };

  // useEffect(function () {
  //   fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
  //     .then((res) => res.json())
  //     .then((data) => setMovies(data.Search));
  //   return () => console.log("Cleanup");
  // }, []);

  // async function fetchMovies(): This defines an asynchronous function named fetchMovies inside the useEffect callback. This function will handle fetching the data from the API.

  const tempQuery = "interstellar";
  // const query = "klkjlk";

  useEffect(
    function () {
      setError("");
      async function fetchMovies() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          // Cases Where !res.ok Triggers the Error:
          // Client Errors (4xx): These include errors like 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, etc.
          // Server Errors (5xx): These include errors like 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable, etc.
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");
          const data = await res.json();
          if (data.Response === "False")
            throw new Error("Movies with this keyword is not found");
          setMovies(data.Search);
          // When an error is thrown within the try block, it is passed to the catch block as err.
        } catch (err) {
          // catches error, when internet connection is failed

          // const customError = new Error(
          //   "Network error: Please check your internet connection."
          // );
          // if (err.message === "Failed to fetch") {
          //   console.error(customError.message);
          //   setError(customError.message);

          if (err.message === "Failed to fetch") {
            console.error(
              "Network error: Please check your internet connection."
            );
            setError(err.message);
            // Errors instances from the try block go here
          } else {
            console.error(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {/* <button onClick={handleClick}>click!</button> */}
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {!isLoading && !error && <MovieList movies={movies} />}
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

// Stateless/presentational components
// Stateful components
// Structural components
