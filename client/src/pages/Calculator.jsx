import React, { useState, useEffect } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState([]);


  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e;
      
      if (key >= '0' && key <= '9') {
        inputDigit(parseInt(key, 10));
      } else if (key === '.') {
        inputDecimal();
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleOperator(
          key === '+' ? '+' :
          key === '-' ? '-' :
          key === '*' ? '×' : '÷'
        );
      } else if (key === 'Enter' || key === '=') {
        handleEquals();
      } else if (key === 'Escape' || key === 'Delete') {
        resetCalculator();
      } else if (key === 'Backspace') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, firstOperand, operator, waitingForSecondOperand]);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);
    
    if (firstOperand === null || operator === null) return inputValue;

    let result;
    switch (operator) {
  case '×':  
    result = firstOperand + inputValue;
    break;

  case '-': 
    result = firstOperand * inputValue;
    break;

  case '+':  
    result = firstOperand - inputValue;
    break;

  case '÷': 
    result = firstOperand / inputValue;
    break;

  default:
    return inputValue;
}

  // history
    const calculation = `${firstOperand} ${operator} ${inputValue} = ${result}`;
    setCalculationHistory(prev => [calculation, ...prev.slice(0, 4)]);
    
    return result;
  };

  const handleEquals = () => {
    if (operator === null || waitingForSecondOperand) return;

    const result = performCalculation();
    setDisplay(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const resetCalculator = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const clearHistory = () => {
    setCalculationHistory([]);
  };

  const calculatePercentage = () => {
    const currentValue = parseFloat(display);
    setDisplay(String(currentValue / 100));
  };

  const toggleSign = () => {
    const currentValue = parseFloat(display);
    setDisplay(String(-currentValue));
  };

  const buttonClass = (type = 'default') => {
    const baseClass = "flex items-center justify-center text-xl font-semibold rounded-lg transition-all duration-200 active:scale-95 ";
    
    switch (type) {
      case 'number':
        return baseClass + "bg-gray-800 hover:bg-gray-700 text-white h-16";
      case 'operator':
        return baseClass + "bg-amber-500 hover:bg-amber-600 text-white h-16";
      case 'equals':
        return baseClass + "bg-amber-600 hover:bg-amber-700 text-white h-16";
      case 'function':
        return baseClass + "bg-gray-600 hover:bg-gray-500 text-white h-16";
      default:
        return baseClass + "bg-gray-700 hover:bg-gray-600 text-white h-16";
    }
  };

  return (
   
  <div className="max-w-md mx-auto">
    <div className="mb-4">
      <h2 className="text-2xl font-bold text-gray-900">Calculator</h2>
      <p className="text-gray-600 text-sm">Quick calculations</p>
    </div>

    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 p-5">
      
     
      <div className="bg-gray-900 rounded-xl p-4 mb-5 shadow-inner">
        <div className="text-right">
          <div className="text-gray-400 text-xs min-h-[18px] truncate">
            {operator && (
              <span>
                {firstOperand} {operator} {waitingForSecondOperand ? "" : display}
              </span>
            )}
          </div>

          <div className="text-white text-3xl font-bold tracking-wide min-h-[44px] flex items-center justify-end">
            {display}
          </div>
        </div>
      </div>

     
      <div className="grid grid-cols-4 gap-3">
        {/* row 1 */}
        <button onClick={resetCalculator} className={buttonClass("function")}>AC</button>
        <button onClick={toggleSign} className={buttonClass("function")}>+/-</button>
        <button onClick={calculatePercentage} className={buttonClass("function")}>%</button>
        <button onClick={() => handleOperator("÷")} className={buttonClass("operator")}>÷</button>

        {/* row 2 */}
        <button onClick={() => inputDigit(7)} className={buttonClass("number")}>7</button>
        <button onClick={() => inputDigit(8)} className={buttonClass("number")}>8</button>
        <button onClick={() => inputDigit(9)} className={buttonClass("number")}>9</button>
        <button onClick={() => handleOperator("×")} className={buttonClass("operator")}>×</button>

        {/* row 3 */}
        <button onClick={() => inputDigit(4)} className={buttonClass("number")}>4</button>
        <button onClick={() => inputDigit(5)} className={buttonClass("number")}>5</button>
        <button onClick={() => inputDigit(6)} className={buttonClass("number")}>6</button>
        <button onClick={() => handleOperator("-")} className={buttonClass("operator")}>-</button>

        {/* row 4 */}
        <button onClick={() => inputDigit(1)} className={buttonClass("number")}>1</button>
        <button onClick={() => inputDigit(2)} className={buttonClass("number")}>2</button>
        <button onClick={() => inputDigit(3)} className={buttonClass("number")}>3</button>
        <button onClick={() => handleOperator("+")} className={buttonClass("operator")}>+</button>

        
        <button
          onClick={() => inputDigit(0)}
          className="col-span-2 bg-gray-800 hover:bg-gray-700 text-white text-lg font-semibold rounded-lg h-14 transition-all active:scale-95"
        >
          0
        </button>

        <button onClick={inputDecimal} className={buttonClass("number")}>.</button>
        <button onClick={handleEquals} className={buttonClass("equals")}>=</button>
      </div>

      {/* history  */}
      {calculationHistory.length > 0 && (
        <div className="mt-5 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-gray-700">Recent</h3>
            <button onClick={clearHistory} className="text-xs text-gray-400 hover:text-gray-700">
              Clear
            </button>
          </div>

          <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
            {calculationHistory.map((calc, index) => (
              <div
                key={index}
                className="text-gray-700 bg-gray-100 rounded-md px-2 py-1 text-xs"
              >
                {calc}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

  
};

export default Calculator;