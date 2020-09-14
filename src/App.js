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

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <SearchBar onSearchChange={(text) => setSearchInput(text)}></SearchBar>
      <PokemonList pokemon={pokemon}></PokemonList>
      <PokemonCard pokemon={pokemon}></PokemonCard>
    </div>
  );
}

export default App;
