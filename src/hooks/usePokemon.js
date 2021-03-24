import { useEffect, useState } from 'react';
import { getPokemon, getPokemonByName } from '../services/pokeApi';

export default function usePokemon(offset) {
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setIsSubmit(true);
    setLoading(true);
    if (query === '') {
      offset = 0;
      getPokemon(offset).then(res => {
        setIsSubmit(false);
        setError('');
        setPokemon(res);
        setLoading(false);
      });
    } else {
      getPokemonByName(query).then(res => {
        if (res.status === 200) {
          setIsSubmit(false);
          setPokemon([res]);
          setError('');
          setLoading(false);
        } else {
          setIsSubmit(false);
          setError('No Pokemon Matched Your Search!');
          setLoading(false);
        }
      });
    }
  };

  const handleChange = ({ target }) => {
    setQuery(target.value);
  };

  useEffect(() => {
    setLoading(true);

    getPokemon(offset).then(res => {
      setPokemon(prevPokemon => {
        return [...prevPokemon, ...res];
      });
      setHasMore(res.length > 0);
      setLoading(false);
    });
  }, [offset]);

  return {
    loading,
    pokemon,
    hasMore,
    handleSubmit,
    error,
    handleChange,
    query,
    isSubmit,
  };
}
