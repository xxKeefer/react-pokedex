import React from "react";

export default function SearchBar({ onSearchChange }) {
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="PokeSearch..."
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </form>
    </div>
  );
}
