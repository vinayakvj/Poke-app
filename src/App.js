import { useEffect, useState } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";

function App() {
  const [Pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();

  useEffect(() => {
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => {
          cancel = c;
        }),
      })
      .then((res) => {
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(
          res.data.results.map((p) => {
            return p.name;
          })
        );
      });

    return () => {
      cancel.cancel();
    };
  }, [currentPageUrl]);

  function ToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function ToPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  return (
    <div>
      <PokemonList Pokemon={Pokemon} />
      <button onClick={ToPrevPage}>Previous</button>
      <button onClick={ToNextPage}>next</button>
    </div>
  );
}

export default App;
