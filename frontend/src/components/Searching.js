import React, { useState } from 'react';

function TextBox({ onSubmit }) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Set submitting state to true

    try {
      if (onSubmit) {
        await onSubmit(text); // Await the asynchronous onSubmit function
      } else {
        console.log(`You submitted: ${text}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false); // Reset submitting state
      setText(''); // Clear the input after submission
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <label style={{ marginRight: '10px' }}>Enter data:</label>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          style={{
            padding: '5px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginRight: '10px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '5px 10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
          }}
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default TextBox;
