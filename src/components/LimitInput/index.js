import { useState } from 'react';
import './style.css';

function LimitInput({ onLimitChange }) {
  const [limit, setLimit] = useState(5);

  const handleChange = (e) => {
    const newValue = e.target.value;
    
    if (newValue === '') {
      alert('Limit cannot be empty');
      return;
    }

    const newLimit = parseInt(newValue, 10);

    if (isNaN(newLimit) || newLimit < 1) {
      alert('Minimum limit is 1');
      return;
    }

    if (newLimit > 10) {
      alert('Maximum limit is 10');
      return;
    }

    setLimit(newLimit);
    onLimitChange(newLimit);
  };

  return (
    <div className="limit-input">
      <label htmlFor="limit">Limit:</label>
      <input
        type="number"
        id="limit"
        min="1"
        max="10"
        value={limit}
        onChange={handleChange}
      />
    </div>
  );
}

export default LimitInput;