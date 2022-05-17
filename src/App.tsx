import React, { useState } from "react";
import { useIntervalWhen, useToggle } from "rooks";

function App() {
  const start = new Date();
  const [diff, setDiff] = useState<number>(0);
  const [isOn, toggle] = useToggle();

  useIntervalWhen(
    () => {
      setDiff((old) => old + 1);
    },
    1000,
    isOn,
    true
  );

  return (
    <div className="h-full w-full bg-slate-300">
      <h1 className="text-3xl">ShinClock</h1>
      <button onClick={toggle}>Toggle</button>
      <span>{diff}</span>
    </div>
  );
}

export default App;
