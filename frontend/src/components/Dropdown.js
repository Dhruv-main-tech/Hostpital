
import React from 'react';

const Dropdown = ({ label, options, value, onChange }) => (
  <div style={{ marginBottom: '10px' }}>
    <label>
      {label}:
      <select value={value} onChange={onChange} style={{ marginLeft: '10px', padding: '5px' }}>
        <option value="">Select...</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  </div>
);

export default Dropdown;
