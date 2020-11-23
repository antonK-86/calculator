import React, { useState } from "react";
import { evaluate } from "mathjs";
import "./styles/Calculator.css";
import Button from "./Button";

function Calculator() {
  const [output, setOutput] = useState("0");
  const [log, setLog] = useState([]);
  const [flag, setFlag] = useState(false);
  const [isMin, setIsMin] = useState(false); //для работы +\-

  const resultLength = 17;

  function changeNum(n) {
    if (n >= 99999999999999999) return "Very big value";
    let c = parseInt(n);
    const cLength = c.toString().length;

    let fractNum = n - Math.floor(Math.abs(n));
    let fractNumLength = 0;

    if (fractNum) {
      fractNumLength = fractNum.toString().length - 2;
      if (cLength + fractNumLength + 1 > resultLength) {
        fractNum = fractNum.toFixed(resultLength - cLength);
      }
    }

    return (+c + +fractNum).toString();
  }

  const btns = [
    "C",
    "<-",
    "X^2",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "+/-",
    "0",
    ",",
    "=",
  ];

  const handleClick = (event) => {
    let key = event.target.innerHTML;

    if (output === "0" && Number.isNaN(parseInt(key))) return; // чтобы вначале выводились только числа

    if (key === "=") {
      setFlag(true);
      setLog([...log, output]);
      setOutput(changeNum(evaluate(log.join("") + output)));
      //setOutput(changeNum(evaluate(log.join("") + (output)).toString());
      setLog([]);
      setIsMin(false);
    }

    if (key === ",") {
      key = ".";
      setOutput((output) => output + key);
    }

    if (key === "+/-") {
      if (!isMin) {
        setOutput((output) => "(-" + output + ")");
        setIsMin(true);
      } else {
        let str = "";
        for (let c of output) {
          if (c !== "-" && c !== "(" && c !== ")") str += c;
        }
        setOutput(str);
        setIsMin(false);
      }
    }

    if (key === "C") {
      setOutput("0");
      setLog([]);
      setFlag(false);
      setIsMin(false);
    }

    if (key === "&lt;-") {
      setOutput((output) => {
        let str = output.slice(0, output.length - 1);
        if (!str) return "0";
        return str;
      });
      setIsMin(false);
    }

    if (key === "X^2") {
      setFlag(true);
      setLog([...log, output]);
      setOutput((prev) => changeNum(Math.pow(prev, 2)));
      setLog([]);
    }

    if (key === "+" || key === "-" || key === "*" || key === "/") {
      setLog([...log, output + key]);
      setFlag(true);
      setIsMin(false);
    }

    if (!Number.isNaN(parseInt(key))) {
      if (output.length === 17) return;
      if (isMin) return;
      if (flag) setOutput("");
      setOutput((output) => {
        if (output === "0") return key; //чтобы 0 не вылез вначале
        return output + key;
      });
      setFlag(false);
    }
  };

  const btn = btns.map((i) => (
    <Button key={i} handleClick={(e) => handleClick(e)}>
      {i}
    </Button>
  ));

  return (
    <div className="calculator">
      <div className="log">
        {log && log.map((i) => <span key={i}>{i}</span>)}
      </div>
      <div className="output">{output}</div>
      <div className="calc-wrap">{btn}</div>
    </div>
  );
}

export default Calculator;
