import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const AllocationForm = (props) => {
  const { dispatch, remaining } = useContext(AppContext);

  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [action, setAction] = useState('');

  const submitEvent = () => {
    if (isNaN(cost)) {
      alert('Please enter a valid number for the cost.');
      setCost('');
      return;
    }

    const costValue = parseInt(cost);

    if (costValue > remaining) {
      alert(`The value cannot exceed the remaining funds £${remaining}`);
      setCost('');
      return;
    }

    const expense = {
      name: name,
      cost: costValue,
    };

    if (action === 'Reduce') {
      dispatch({
        type: 'RED_EXPENSE',
        payload: expense,
      });
    } else {
      dispatch({
        type: 'ADD_EXPENSE',
        payload: expense,
      });
    }
  };

  const handleCostChange = (event) => {
    // Allow only numbers and an optional decimal point (e.g., 123 or 123.45)
    const regex = /^[0-9]+(\.[0-9]{0,2})?$/;
    if (!regex.test(event.target.value)) {
      alert('Please enter a valid number for the cost.');
      return;
    }

    const costValue = parseFloat(event.target.value);
    if (costValue > remaining) {
      alert(`The value cannot exceed the remaining funds £${remaining}`);
      return;
    }
    
    setCost(event.target.value);
  };

  return (
    <div>
      <div className='row'>
        <div className='input-group mb-3' style={{ marginLeft: '2rem' }}>
          <div className='input-group-prepend'>
            <label className='input-group-text' htmlFor='inputGroupSelect01'>
              Department
            </label>
          </div>
          {/* Department selection code... */}
          <select
            className='custom-select'
            id='inputGroupSelect01'
            onChange={(event) => setName(event.target.value)}>
            <option defaultValue>Choose...</option>
            <option value='Marketing' name='marketing'>
              Marketing
            </option>
            <option value='Sales' name='sales'>
              Sales
            </option>
            <option value='Finance' name='finance'>
              Finance
            </option>
            <option value='HR' name='hr'>
              HR
            </option>
            <option value='IT' name='it'>
              IT
            </option>
            <option value='Admin' name='admin'>
              Admin
            </option>
          </select>

          <div className='input-group-prepend' style={{ marginLeft: '2rem' }}>
            <label className='input-group-text' htmlFor='inputGroupSelect02'>
              Allocation
            </label>
          </div>
          <select
            className='custom-select'
            id='inputGroupSelect02'
            onChange={(event) => setAction(event.target.value)}>
            <option defaultValue value='Add' name='Add'>
              Add
            </option>
            <option value='Reduce' name='Reduce'>
              Reduce
            </option>
          </select>

          {/* Add currency prefix to the cost input field */}
          <div className='input-group-prepend' style={{ marginLeft: '2rem' }}>
            <span className='input-group-text'>£</span>
          </div>
          <input
            required='required'
            type='text'
            pattern='[0-9]+(\.[0-9]{0,2})?'
            id='cost'
            value={cost}
            style={{ marginLeft: '0rem' }}
            onChange={handleCostChange}
          />
          
          {/* Save button code... */}
          <button className='btn btn-primary' onClick={submitEvent} style={{ marginLeft: '2rem' }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllocationForm;
