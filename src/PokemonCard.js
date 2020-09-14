import React from "react";

export default function PokemonCard({ pokemonInfo, species }) {
  if (pokemonInfo && species) {
    return (
      <div>
        <img alt="" src={pokemonInfo.sprites.front_default}></img>
        <p>{species.flavor_text_entries[0].flavor_text}</p>
      </div>
    );
  } else {
    return null;
  }
}
