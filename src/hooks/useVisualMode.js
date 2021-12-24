import React from "react";

export default function useVisualMode(initial) {
  //const [mode, setMode] = useState(initial);
  const [history, setHistory] = React.useState([initial]);

  const transition = (newMode) => {
    //setMode(newMode);
    setHistory([...history, newMode])
  }


  const back = () => {
    //setMode(newMode);
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory)
  }

  return { mode: history[history.length - 1], transition, back }




}
//useVisualMode("EDIT")