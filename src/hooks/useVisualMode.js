import React from "react";

export default function useVisualMode(initial) {
  //const [mode, setMode] = useState(initial);
  const [history, setHistory] = React.useState([initial]);

  const transition = (newMode, replace = false) => {
    //setMode(newMode);
    if (replace === true) {
      setHistory(prevHistory => {
        const newHistory = [...prevHistory];
        newHistory.pop();
        newHistory.push(newMode);
        return newHistory;
      })
    } else {
      setHistory([...history, newMode])
    }
  }


  const back = () => {
    console.log("testing cancel", history);

    //setMode(newMode);
    if (history.length < 2) {
      return;
    }
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory)
  }
  console.log("history", history);
  return { mode: history[history.length - 1], transition, back }




}
//useVisualMode("EDIT")