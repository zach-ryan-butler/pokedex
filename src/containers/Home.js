import React, { useState, useRef, useCallback } from 'react';

import usePokemon from '../hooks/usePokemon';
import PokemonList from '../components/pokemonList/PokemonList';
import SearchForm from '../components/searchForm/SearchForm';

export default function Home() {
  const [offset, setOffset] = useState(0);

  const {
    pokemon,
    hasMore,
    loading,
    query,
    handleSubmit,
    handleChange,
    error,
    isSubmit,
  } = usePokemon(offset);

  const observer = useRef();

  const lastPokemonElementRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset(prevOffset => prevOffset + 20);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <SearchForm
        handleSubmit={handleSubmit}
        query={query}
        handleChange={handleChange}
      />
      <PokemonList
        loading={loading}
        isSubmit={isSubmit}
        error={error}
        pokemon={pokemon}
        lastPokemonElementRef={lastPokemonElementRef}
      />
      {loading && isSubmit === false ? <p>Loading...</p> : <p></p>}
    </>
  );
}
