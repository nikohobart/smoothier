import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [term]);

  useEffect(() => {
    onSearch(debouncedTerm);
  }, [debouncedTerm]);

  return (
    <div className="ui search">
      <div className="ui icon input" style={{ width: '90%' }}>
        <input
          value={term}
          onChange={e => setTerm(e.target.value)}
          className="prompt"
          type="text"
          placeholder="Find specific recipes..."
        />
        <i className="search icon"></i>
      </div>
      <div className="results"></div>
    </div>
  );
};

export default SearchBar;
