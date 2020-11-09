import React, { useState } from "react";
import { evaluate } from "mathjs";
import "./styles/Calculator.css";
import Button from "./Button";

function Calculator() {
  // console.log("render calculator");

  const [output, setOutput] = useState("0");
  const [log, setLog] = useState([]);
  const [flag, setFlag] = useState(false);
  const [isMin, setIsMin] = useState(false); //для работы +\-

  const btns = [
    "C",
    "<-",
    "%",
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
      console.log(log.join(""));
      setOutput(evaluate(log.join("") + output).toString());
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

    if (key === "+" || key === "-" || key === "*" || key === "/") {
      setLog([...log, output + key]);
      setFlag(true);
      setIsMin(false);
    }

    // доработать % и +\-//

    if (!Number.isNaN(parseInt(key))) {
      if (isMin) return;
      if (flag) setOutput("");
      setOutput((output) => {
        if (output === "0") return key; //чтобы 0 не вылез вначале
        return output + key;
      });
      setFlag(false);
    }
  };

  //console.log(log);
  // console.log("output - " + output);

  const btn = btns.map((i) => (
    <Button key={i} handleClick={(e) => handleClick(e)}>
      {i}
    </Button>
  ));

  return (
    <div className="calculator">
      {log && log.map((i) => <span key={i}>{i}</span>)}
      <div className="output">{output}</div>
      <div className="calc-wrap">{btn}</div>
    </div>
  );
}

export default Calculator;
