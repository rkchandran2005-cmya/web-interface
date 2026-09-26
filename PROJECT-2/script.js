let counterValue = 0;

function updateDisplay() {
  document.getElementById('counter-value').textContent = counterValue;
}

function increase() {
  counterValue += 1;
  updateDisplay();
}

function decrease() {
  if (counterValue > 0) {
    counterValue -= 1;
    updateDisplay();
    return;
  }

  alert('The counter cannot go below zero.');
}

function reset() {
  counterValue = 0;
  updateDisplay();
}