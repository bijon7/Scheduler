import React from "react";
//useVisualMode defines back and transition modes and exports to the index.js file.
export default function useVisualMode(initial) {
  const [history, setHistory] = React.useState([initial]);
  //transition function defines options to directly go back to the previous mode as well 
  //as going back to a mode BEFORE the previous mode based on the replace value.
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

  //back function sets new state to the previous mode.
  const back = () => {

    //setMode(newMode);
    if (history.length < 2) {
      return;
    }
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory)
  }
  return { mode: history[history.length - 1], transition, back }




}
