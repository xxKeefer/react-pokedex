import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
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
    setPokemon(
      allPokes.filter((p) => p.name.match(new RegExp(`^${regex}\\w+`)))
    );
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
      <h1>Pokedex</h1>
      <SearchBar onSearchChange={(text) => setSearchInput(text)}></SearchBar>
      <PokemonList pokemon={pokemon}></PokemonList>
      <PokemonCard pokemonInfo={pokemonInfo} species={species}></PokemonCard>
    </div>
  );
}

export default App;
