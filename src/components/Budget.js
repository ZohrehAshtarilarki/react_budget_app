import React, { useState } from 'react';

const Budget = () => {
  const initialBudget = 1000; // Initial budget value
  const maxBudget = 20000; // Upper limit for the budget

  const [budget, setBudget] = useState(initialBudget);

  const handleBudgetChange = (event) => {
    const option = event.target.value;

    if (option === 'increase' && budget + 10 <= maxBudget) {
      setBudget((prevBudget) => prevBudget + 10);
    } else if (option === 'decrease' && budget - 10 >= 0) {
      setBudget((prevBudget) => prevBudget - 10);
    }
  };

  return (
    <div>
      <div className='alert alert-secondary'>
        <span>Budget: £</span>
        <input
          required='required'
          type='number'
          value={budget}
          max={maxBudget}
          style={{ width: '100px' }}
          onChange={(event) => setBudget(parseInt(event.target.value))}
        />
        <select
          className='custom-select'
          onChange={handleBudgetChange}
          style={{ marginLeft: '1rem' }}
        >
          {budget + 10 <= maxBudget && <option value='increase'>Increase by £10</option>}
          {budget - 10 >= 0 && <option value='decrease'>Decrease by £10</option>}
        </select>
      </div>
    </div>
  );
};

export default Budget;
