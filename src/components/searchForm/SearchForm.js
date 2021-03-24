import React from 'react';

export default function SearchForm({ handleSubmit, query, handleChange }) {
  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={query} onChange={handleChange} />
      <button type='submit'>submit</button>
    </form>
  );
}
