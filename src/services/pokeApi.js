import axios from 'axios';

export const getPokemon = offset => {
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      if (res.status !== 200) throw new Error('could not fetch all pokemon');

      return Promise.all(
        res.data.results.map(pokemon => {
          return axios
            .get(pokemon.url, {
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then(res => {
              if (res.status !== 200)
                throw new Error('could not fetch this pokemon');
              return res;
            });
        })
      ).then(res => {
        return res;
      });
    });
};

export const getPokemonByName = name => {
  const formattedName = name.toLowerCase();
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon/${formattedName}/`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      if (res.status !== 200) throw new Error(`could not get ${name}`);
      return res;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
