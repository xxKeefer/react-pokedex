import React from "react";

export default function PokemonList({ pokemon }) {
  return (
    <div>
      {pokemon.map((p) => (
        <div class="is-capitalized" key={p.name}>
          {p.name}
        </div>
      ))}
    </div>
  );
}
