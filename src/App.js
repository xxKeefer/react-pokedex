import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import "react-bulma-components/dist/react-bulma-components.min.css";
import PokemonList from "./PokemonList";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";

function App() {
  const [allPokes, setAllPokes] = useState([]);
  const [pokemon, setPokemon] = useState(allPokes);
  const [searchInput, setSearchInput] = useState(".*");
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [species, setSpecies] = useState(null);

  useEffect(() => {
    axios.get("http://pokeapi.co/api/v2/pokemon/?limit=811").then((res) => {
      setAllPokes(res.data.results.map((p) => p));
      setPokemon(res.data.results.map((p) => p));
    });
  }, []);

  useEffect(() => {
    let regex;
    searchInput === null ? (regex = ".*") : (regex = searchInput);
    // allPokes.filter((p) => p.name.match(new RegExp(`^${regex}$`)));
    let newList = allPokes.filter((p) =>
      p.name.match(new RegExp(`^${regex}\\w+`))
    );
    if (newList.length === 2) {
      setPokemon([newList[0]]);
    } else {
      setPokemon(newList);
    }
  }, [allPokes, searchInput]);

  useEffect(() => {
    if (pokemon.length === 1) {
      axios.get(pokemon[0].url).then((res) => {
        setPokemonInfo(res.data);
      });
    } else {
      setPokemonInfo(null);
    }
  }, [pokemon]);

  useEffect(() => {
    if (pokemonInfo !== null) {
      axios.get(pokemonInfo.species.url).then((res) => {
        setSpecies(res.data);
      });
    } else {
      setSpecies(null);
    }
  }, [pokemonInfo]);

  return (
    <div className="App">
      <div class="has-text-centered">
        <section class="hero is-success is-small">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">Pokedex</h1>
              <h2 class="subtile">type to filter down the results..</h2>
              <SearchBar
                onSearchChange={(text) => setSearchInput(text)}
              ></SearchBar>
            </div>
          </div>
        </section>
        <div className="columns is-centered">
          <div className="column is-third">
            <PokemonList pokemon={pokemon}></PokemonList>
            <PokemonCard
              pokemonInfo={pokemonInfo}
              species={species}
            ></PokemonCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
