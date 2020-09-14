import React from "react";

export default function PokemonCard({ pokemon }) {
  if (pokemon.length === 1) {
    return (
      <div>
        <h1>{pokemon[0].url}</h1>
      </div>
    );
  } else {
    return <div></div>;
  }
}
