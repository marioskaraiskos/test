import React from 'react';

const Cell = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="cell"
      value={value}
      onChange={onChange}
      maxLength="1"
    />
  );
};

export default Cell;