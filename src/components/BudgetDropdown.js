import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const BudgetDropdown = () => {
  const { currency, dispatch } = useContext(AppContext);

  const handleCurrencyChange = (event) => {
    dispatch({
      type: 'CHG_CURRENCY',
      payload: event.target.value,
    });
  };

  return (
    <div>
        <div className='alert alert-secondary'>
            <label>Currency: </label>
            <select className='custom-select' onChange={handleCurrencyChange} value={currency}>
                <option value='$'>Dollar ($)</option>
                <option value='£'>Pound (£)</option>
                <option value='€'>Euro (€)</option>
                <option value='₹'>Rupee (₹)</option>
            </select>
        </div>
    </div>
  );
};

export default BudgetDropdown;