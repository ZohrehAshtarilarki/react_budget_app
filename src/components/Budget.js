import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
  const { budget, currency, expenses, dispatch } = useContext(AppContext);
  const maxBudget = 20000; // Upper limit for the budget

  const [editableBudget, setEditableBudget] = useState(budget);
  const [error, setError] = useState('');

  const handleBudgetChange = (event) => {
    const newBudget = parseInt(event.target.value);
    setEditableBudget(newBudget);
    setError('');
  };

  const handleIncrease = () => {
    const newBudget = editableBudget + 10;
    if (newBudget <= maxBudget) {
      setEditableBudget(newBudget);
      setError('');
    } else {
      setError(`Cannot increase budget! It exceeds the upper limit of ${currency}${maxBudget}.`);
    }
  };

  const handleDecrease = () => {
    const newBudget = editableBudget - 10;
    if (newBudget >= getTotalExpenses()) {
      setEditableBudget(newBudget);
      setError('');
    } else {
      setError('Cannot decrease budget! It goes below the total expenses.');
    }
  };

  const handleSave = () => {
    if (editableBudget <= maxBudget && editableBudget >= getTotalExpenses()) {
      dispatch({
        type: 'SET_BUDGET',
        payload: editableBudget,
      });
    } else if (editableBudget < getTotalExpenses()) {
      setError('Cannot save budget! It goes below the total expenses.');
    } else {
      setError(`Cannot save budget! It exceeds the upper limit of ${currency}${maxBudget}.`);
    }
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, item) => total + item.cost, 0);
  };

  const handleCurrencyChange = (event) => {
    dispatch({
      type: 'CHG_CURRENCY',
      payload: event.target.value,
    });
  };

  return (
    <div>
      <div className='alert alert-secondary'>
        <span>Budget: {currency}</span>
        <input
          required='required'
          type='number'
          value={editableBudget}
          max={maxBudget}
          style={{ width: '100px' }}
          onChange={handleBudgetChange}
        />
        <button className='btn btn-success' onClick={handleIncrease}>
          Increase by {currency}10
        </button>
        <button className='btn btn-danger' onClick={handleDecrease}>
          Decrease by {currency}10
        </button>
        <button className='btn btn-primary' onClick={handleSave}>
          Save
        </button>
      </div>
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default Budget;
