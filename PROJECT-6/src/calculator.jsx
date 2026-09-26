import { useEffect, useState } from 'react';
import './calculator.css';

const buttons = [
  ['AC', 'clear', 'function'], ['DEL', 'delete', 'function'], ['%', 'percent', 'function'], ['/', 'operator', 'operator'],
  ['7', 'number'], ['8', 'number'], ['9', 'number'], ['*', 'operator', 'operator'],
  ['4', 'number'], ['5', 'number'], ['6', 'number'], ['-', 'operator', 'operator'],
  ['1', 'number'], ['2', 'number'], ['3', 'number'], ['+', 'operator', 'operator'],
  ['0', 'number', 'zero'], ['.', 'decimal'], ['=', 'equals', 'equals'],
];

const symbols = { '/': '÷', '*': '×', '-': '−' };

function calculate(first, second, operator) {
  const left = Number(first);
  const right = Number(second);
  if (operator === '+') return left + right;
  if (operator === '-') return left - right;
  if (operator === '*') return left * right;
  if (operator === '/') return right === 0 ? null : left / right;
  return right;
}

function format(value) {
  if (value === null || !Number.isFinite(Number(value))) return 'Error';
  return String(Number(Number(value).toFixed(10)));
}

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previous, setPrevious] = useState(null);
  const [operator, setOperator] = useState(null);
  const [replaceDisplay, setReplaceDisplay] = useState(false);

  const clear = () => {
    setDisplay('0');
    setPrevious(null);
    setOperator(null);
    setReplaceDisplay(false);
  };

  const addNumber = (number) => {
    if (display === 'Error' || replaceDisplay) {
      setDisplay(number);
      setReplaceDisplay(false);
      return;
    }
    setDisplay(display === '0' ? number : display + number);
  };

  const addDecimal = () => {
    if (display === 'Error' || replaceDisplay) {
      setDisplay('0.');
      setReplaceDisplay(false);
    } else if (!display.includes('.')) {
      setDisplay(`${display}.`);
    }
  };

  const chooseOperator = (nextOperator) => {
    if (display === 'Error') return;
    if (previous !== null && operator && !replaceDisplay) {
      const result = format(calculate(previous, display, operator));
      setDisplay(result);
      setPrevious(result);
    } else {
      setPrevious(display);
    }
    setOperator(nextOperator);
    setReplaceDisplay(true);
  };

  const equals = () => {
    if (previous === null || !operator || display === 'Error') return;
    setDisplay(format(calculate(previous, display, operator)));
    setPrevious(null);
    setOperator(null);
    setReplaceDisplay(true);
  };

  const deleteLast = () => {
    if (display === 'Error' || replaceDisplay) {
      clear();
    } else {
      setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
    }
  };

  const percent = () => {
    if (display !== 'Error') setDisplay(format(Number(display) / 100));
  };

  const runAction = (action, value) => {
    if (action === 'number') addNumber(value);
    if (action === 'decimal') addDecimal();
    if (action === 'operator') chooseOperator(value);
    if (action === 'equals') equals();
    if (action === 'clear') clear();
    if (action === 'delete') deleteLast();
    if (action === 'percent') percent();
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (/^[0-9]$/.test(event.key)) runAction('number', event.key);
      else if (['+', '-', '*', '/'].includes(event.key)) runAction('operator', event.key);
      else if (event.key === '.') runAction('decimal');
      else if (event.key === '%') runAction('percent');
      else if (event.key === 'Enter' || event.key === '=') runAction('equals');
      else if (event.key === 'Backspace') runAction('delete');
      else if (event.key === 'Escape' || event.key === 'Delete') runAction('clear');
      else return;
      event.preventDefault();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <section className="calculator-page" aria-label="Simple calculator">
      <div className="calculator-intro">
        <p className="eyebrow">A small tool for clear thinking</p>
        <h1>Simple <em>calculator.</em></h1>
        <p>Basic arithmetic with percentage, decimal, clear, delete, and keyboard input.</p>
      </div>
      <div className="calculator-card">
        <div className="calculator-display" aria-live="polite">
          <span>{previous !== null && operator ? `${previous} ${symbols[operator] || operator}` : 'Ready'}</span>
          <strong>{display}</strong>
        </div>
        <div className="calculator-grid">
          {buttons.map(([label, action, className = '']) => (
            <button className={`calculator-button ${className}`} key={label} onClick={() => runAction(action, label)}>
              {symbols[label] || label}
            </button>
          ))}
        </div>
        <p className="calculator-hint">Keyboard supported · Enter to calculate · Esc to clear</p>
      </div>
    </section>
  );
}
