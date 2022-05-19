
import React, { useState } from "react";
import { useIntervalWhen, useToggle } from "rooks";

export const Home = ()=> {
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
    <div className="h-full">
      <h1 className="text-3xl">ShinClock</h1>
      <button onClick={toggle}>Toggle</button>
      <span>{diff}</span>
    </div>
  );
}

