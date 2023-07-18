import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';
import increaseButtonImage from './Increase_icon.png';
import decreaseButtonImage from './Decrease_icon.png';

const ExpenseItem = (props) => {
    const { dispatch } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10, // To increase by 10 units
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });
    }

    const decreaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: -10, // To decrease by 10 units
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense,
        });
    };


    return (
        <tr>
        <td>{props.name}</td>
        <td>£{props.cost}</td>
        <td>
            <button 
                style={{
                    backgroundImage: `url(${increaseButtonImage})`,
                    backgroundSize: 'cover',
                    width: '30px', 
                    height: '30px',
                    border: 'none',
                    cursor: 'pointer',
                }}
                onClick={event=> increaseAllocation(props.name)}
            >
            </button>
        </td>
        <td>
            <button
                style={{
                    backgroundImage: `url(${decreaseButtonImage})`,
                    backgroundSize: 'cover',
                    width: '30px', 
                    height: '30px',
                    border: 'none',
                    cursor: 'pointer',
                }}
                onClick={() => decreaseAllocation(props.name)}
            >
            </button>
        </td>
        <td><TiDelete size='1.5em' onClick={handleDeleteExpense}></TiDelete></td>
        </tr>
    );
};

export default ExpenseItem;
