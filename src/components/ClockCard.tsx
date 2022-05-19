import React from "react";
import { useIntervalWhen, useToggle } from "rooks";
import { Clock } from "../hooks/clock";

export const ClockCard = (props: { clock: Clock }) => {
  const { clock } = props;
  const [isOn, toggle] = useToggle();
  useIntervalWhen(
    () => {
      // countDown()
    },
    1000,
    isOn,
    true
  );
  return (
    <div className="flex font-sans">
      <div className="p-3 bg-white rounded-lg shadow-md">
        <div className="flex flex-wrap">
          <h1 className="flex-auto text-lg font-semibold text-slate-900">
            {clock.name}
          </h1>
          <p className="flex-auto text-lg font-semibold text-slate-900">
            {clock.start_at && clock.start_at.toDate().toDateString()}
            {/* {("000" + second).slice(-2)}s */}
          </p>
        </div>
        <div className="flex space-x-4 mb-6 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            <button
              className="h-10 px-6 font-semibold rounded-md bg-black text-white"
              onClick={toggle}
            >
              Start
            </button>
            <button
              className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
              type="button"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
