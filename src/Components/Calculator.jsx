import React, { useState, useEffect } from 'react';


const Calculator = () => {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (/\d/.test(key) || key === '+' || key === '-' || key === '*' || key === '/' || key === '.') {
        setDisplay(prevDisplay => prevDisplay + key);
      } else if (key === 'Enter') {
        event.preventDefault(); // Prevents form submission or default behavior
        calculate();
      } else if (key === 'Escape') {
        clearDisplay();
      } else if (key === 'Backspace') {
        // Handle backspace to delete last character
        setDisplay(prevDisplay => prevDisplay.slice(0, -1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [display]); // Add 'display' as a dependency

  const handleClick = (value) => {
    setDisplay(prevDisplay => prevDisplay + value);
  };

  const calculate = () => {
    try {
      setDisplay(eval(display).toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  const clearDisplay = () => {
    setDisplay('');
  };

  return (
    <div className="calculator">
      <h2>Calculator</h2>
      <input
        className="display"
        type="text"
        value={display}
        readOnly
      />
      <div className="buttons">
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('/')}>/</button>
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('*')}>*</button>
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('-')}>-</button>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={() => handleClick('.')}>.</button>
        <button onClick={() => handleClick('+')}>+</button>
        <button onClick={calculate}>=</button>
        <button onClick={clearDisplay}>C</button>
        <button onClick={() => setDisplay(prevDisplay => prevDisplay.slice(0, -1))}>Edit</button>
      </div>
    </div>
  );
};

export default Calculator;
