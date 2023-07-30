const calcData = [
  { id: "clear", value: "AC" },
  { id: "divide", value: "/" },
  { id: "multiply", value: "x" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "equals", value: "=" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." }
];

const operators = ["AC", "/", "x", "+", "-", "="];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function Display({ input, output }) {
  const resultSpan = document.querySelector('.result');
  const inputSpan = document.getElementById('display');

  resultSpan.textContent = output;
  inputSpan.textContent = input;
}

function Key({ keyData: { id, value }, handleInput }) {
  const button = document.createElement('button');
  button.id = id;
  button.textContent = value;
  button.addEventListener('click', () => handleInput(value));

  return button;
}

function Keyboard({ handleInput }) {
  const keysDiv = document.createElement('div');
  keysDiv.className = 'keys';

  calcData.forEach((key) => {
    const keyComponent = Key({ keyData: key, handleInput });
    keysDiv.appendChild(keyComponent);
  });

  return keysDiv;
}

function App() {
  let input = "0";
  let output = "";
  let calculatorData = "";

  function handleSubmit() {
    console.log({ calculatorData });

    const total = eval(calculatorData);
    input = total;
    output = `${total} = ${total}`;
    calculatorData = `${total}`;
  }

  function handleClear() {
    input = "0";
    output = "0";
    calculatorData = "";
    handleOutput();
  }

  function handleNumbers(value) {
    if (!calculatorData.length) {
      input = `${value}`;
      calculatorData = `${value}`;
    } else {
      if (value === 0 && (calculatorData === "0" || input === "0")) {
        calculatorData = `${calculatorData}`;
      } else {
        const lastChat = calculatorData.charAt(calculatorData.length - 1);
        const isLastChatOperator = lastChat === "*" || operators.includes(lastChat);

        input = isLastChatOperator ? `${value}` : `${input}${value}`;
        calculatorData = `${calculatorData}${value}`;
      }
    }
  }

  function dotOperator() {
    const lastChat = calculatorData.charAt(calculatorData.length - 1);
    if (!calculatorData.length) {
      input = "0.";
      calculatorData = "0.";
    } else {
      if (lastChat === "*" || operators.includes(lastChat)) {
        input = "0.";
        calculatorData = `${calculatorData} 0.`;
      } else {
        input = lastChat === "." || input.includes(".") ? `${input}` : `${input}.`;

        const formattedValue =
          lastChat === "." || input.includes(".") ? `${calculatorData}` : `${calculatorData}.`;
        calculatorData = formattedValue;
      }
    }
  }

  function handleOperators(value) {
    if (calculatorData.length) {
      input = `${value}`;
      const beforeLastChat = calculatorData.charAt(calculatorData.length - 2);

      const beforeLastChatIsOperator =
        operators.includes(beforeLastChat) || beforeLastChat === "*";

      const lastChat = calculatorData.charAt(calculatorData.length - 1);
      
      const lastChatIsOperator = operators.includes(lastChat) || lastChat === "*";
      
      const validOp = value === "x" ? "*" : value;
      if (
        (lastChatIsOperator && value !== "-") ||
        beforeLastChatIsOperator && lastChatIsOperator
      ) {
        if (beforeLastChatIsOperator) {
          const updatedValue = `${calculatorData.substring(
            0,
            calculatorData.length - 2
          )}${value}`;
          calculatorData = updatedValue;
        } else {
          calculatorData = `${calculatorData.substring(0, calculatorData.length - 1)}${validOp}`;
        }
      } else {
        calculatorData = `${calculatorData}${validOp}`;
      }
    }
  }

  function handleInput(value) {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
      case "=":
        handleSubmit();
        break
        case "=":
          handleSubmit();
          break;
        case "AC":
          handleClear();
          break;
        case number:
          handleNumbers(value);
          break;
        case ".":
          dotOperator(value);
          break;
        case operator:
          handleOperators(value);
          break;
        default:
          break;
      }
  
      handleOutput();
    }
  
    function handleOutput() {
      Display({ input, output });
    }
  
    function handleEffect() {
      handleOutput();
    }
  
    function init() {
      const container = document.querySelector('.container');
  
      const calculator = document.createElement('div');
      calculator.className = 'calculator';
  
      const outputDiv = document.createElement('div');
      outputDiv.className = 'output';
  
      const resultSpan = document.createElement('span');
      resultSpan.className = 'result';
  
      const inputSpan = document.createElement('span');
      inputSpan.id = 'display';
      inputSpan.className = 'input';
  
      outputDiv.appendChild(resultSpan);
      outputDiv.appendChild(inputSpan);
  
      calculator.appendChild(outputDiv);
  
      const keyboard = Keyboard({ handleInput });
      calculator.appendChild(keyboard);
  
      container.appendChild(calculator);
    }
  
    init();
  }
  
  
  App();
  
