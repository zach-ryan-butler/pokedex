import React from 'react';

export default function PokemonList({
  loading,
  isSubmit,
  error,
  pokemon,
  lastPokemonElementRef,
}) {
  return (
    <>
      {loading && isSubmit === true ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {pokemon.map((p, index) => {
            if (pokemon.length === index + 1 && pokemon.length > 1) {
              return (
                <li key={p.data.id} ref={lastPokemonElementRef}>
                  <img src={p.data.sprites.front_default} alt={p.data.name} />
                  <p>{p.data.name}</p>
                </li>
              );
            }
            return (
              <li key={p.data.id}>
                <img src={p.data.sprites.front_default} alt={p.data.name} />
                <p>{p.data.name}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
