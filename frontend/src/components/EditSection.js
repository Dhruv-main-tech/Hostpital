// src/components/EditSection.js
import React from 'react';
import DropdownList from './DropdownList';

const EditSection = ({ field, data, editedValue, selectedOptions, dropdownOptions, onEdit, onSave, onDropdownChange, onInputChange }) => (
  <div>
    <p style={{ display: "inline-block", marginRight: "10px" }}>
      <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {data[field].join(", ")}
    </p>
    {data.editField === field ? (
      <div>
        <input
          type="text"
          value={editedValue}
          onChange={onInputChange}
        />
        {dropdownOptions.map((option, index) => (
          <DropdownList
            key={index}
            label={option}
            options={dropdownOptions}
            selectedOptions={selectedOptions}
            onChange={(e) => onDropdownChange(e, field)}
          />
        ))}
        <button
          style={{
            padding: "5px 10px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
            marginLeft: "10px",
          }}
          onClick={() => onSave(field)}
        >
          Save
        </button>
      </div>
    ) : (
      <button
        style={{
          padding: "5px 10px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
        onClick={() => onEdit(field)}
      >
        Edit
      </button>
    )}
  </div>
);

export default EditSection;
