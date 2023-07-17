import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const AllocationForm = (props) => {
    const { dispatch,remaining  } = useContext(AppContext);
     const upperLimit = 20000;

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');

    // Making Budget editable by increasing its value by 10
    const handleIncrease = () => {
        setCost((prevCost) => {
          const newValue = parseInt(prevCost) + 10;
          return isNaN(newValue) ? prevCost : newValue;
        });
      };
    
      // Making Budget editable by decreasing its value by 10
      const handleDecrease = () => {
        setCost((prevCost) => {
          const newValue = parseInt(prevCost) - 10;
          return isNaN(newValue) ? prevCost : newValue;
        });
      };

    const submitEvent = () => {
        if(isNaN(cost)) {
            alert('Please enter a valid number for the cost.');
            setCost('');
            return;
        }

        const costValue = parseInt(cost);

        if (costValue > upperLimit) {
          alert(`The value cannot exceed the upper limit of £${upperLimit}.`);
          setCost('');
          return;
        }

        if(costValue > remaining) {
            alert(`The value cannot exceed the remaining funds of £${remaining}.`);
            setCost("");
            return;
        }

        // Check if the allocated amount exceeds the budget
        const allocatedBudget = action === 'Reduce' ? remaining + costValue : remaining - costValue;

        if (allocatedBudget < 0) {
          alert('The allocated amount cannot exceed the budget.');
          setCost('');
          return;
        }

        const expense = {
            name: name,
            cost: costValue,
        };

        if(action === "Reduce") {
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

    return (
        <div>
            <div className='row'>

            <div className="input-group mb-3" style={{ marginLeft: '2rem' }}>
                    <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Department</label>
                  </div>
                  <select className="custom-select" id="inputGroupSelect01" onChange={(event) => setName(event.target.value)}>
                        <option defaultValue>Choose...</option>
                        <option value="Marketing" name="marketing"> Marketing</option>
                <option value="Sales" name="sales">Sales</option>
                <option value="Finance" name="finance">Finance</option>
                <option value="HR" name="hr">HR</option>
                <option value="IT" name="it">IT</option>
                <option value="Admin" name="admin">Admin</option>
                  </select>

                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                <label className="input-group-text" htmlFor="inputGroupSelect02">Allocation</label>
                  </div>
                  <select className="custom-select" id="inputGroupSelect02" onChange={(event) => setAction(event.target.value)}>
                        <option defaultValue value="Add" name="Add">Add</option>
                <option value="Reduce" name="Reduce">Reduce</option>
                  </select>

                    <input
                        required='required'
                        type='number'
                        id='cost'
                        value={cost}
                        style={{ marginLeft: '2rem' , size: 10}}
                        onChange={(event) => setCost(event.target.value)}>
                        </input>

                    <button className="btn btn-primary" onClick={submitEvent} style={{ marginLeft: '2rem' }}>
                        Save
                    </button>
                </div>
                </div>

        </div>
    );
};

export default AllocationForm;
