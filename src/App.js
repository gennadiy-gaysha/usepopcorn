import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import { useState } from "react";
import { tempMovieData } from "./components/temporaryData";
import ListBox from "./components/ListBox";
import WatchedBox from "./components/WatchedBox";
import MovieList from "./components/MovieList";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <ListBox>
          <MovieList movies={movies} />
        </ListBox>
        <WatchedBox />
      </Main>
    </>
  );
}

// Stateless/presentational components
// Stateful components
// Structural components
