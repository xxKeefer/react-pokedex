import React from "react";

export default function PokemonCard({ pokemonInfo, species }) {
  if (pokemonInfo && species) {
    let processedFlavorText = species.flavor_text_entries[0].flavor_text
      .split(/\s/)
      .join(" ");
    return (
      <div className="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure className="image is-128x128">
                <img alt="" src={pokemonInfo.sprites.front_default}></img>
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4 is-capitalized">{pokemonInfo.name}</p>
              <p className="subtitle is-6">
                {pokemonInfo.types.map((t) => (
                  <span className="is-capitalized">{t.type.name} </span>
                ))}
              </p>
              <p class="">{processedFlavorText}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
