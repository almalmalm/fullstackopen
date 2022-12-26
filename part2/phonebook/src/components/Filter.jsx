import React from 'react';

const Search = ({ value, onChange }) => {
  return (
    <div>
      <div>
        filter show with <input value={value} onChange={onChange} />
      </div>
    </div>
  );
};

export default Search;
