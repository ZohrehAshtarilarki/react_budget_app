import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const BudgetDropdown = () => {
  const { currency, dispatch } = useContext(AppContext);

  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value
    dispatch({
      type: 'CHG_CURRENCY',
      payload: newCurrency,
    });

    // Update all currency representations on the screen
    const elementsToUpdate = document.querySelectorAll('.currency-representation');
    elementsToUpdate.forEach((element) => {
      element.innerHTML = newCurrency;
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