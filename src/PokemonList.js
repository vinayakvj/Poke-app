import React from "react";

function PokemonList({ Pokemon }) {
  return (
    <div>
      {Pokemon.map((p) => {
        return <p>{p}</p>;
      })}
    </div>
  );
}

export default PokemonList;
