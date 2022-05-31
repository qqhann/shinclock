import React, { useEffect, useState } from "react";
import { useIntervalWhen } from "rooks";

import { FirestoreInput } from "./FirestoreInput";

import { Duration, padZero, secondsToDuration } from "src/utils/time";
import { Clock, useClock } from "src/hooks/clock";
import { useNotification } from "src/hooks/notification";
import { useSoundEffects } from "src/hooks/sound";

const useClockCard = (clock: Clock) => {
  const [duration, setDuration] = useState<Duration>(
    secondsToDuration(clock.total_seconds - clock.seconds_passed)
  );
  const { notify } = useNotification();
  const { play } = useSoundEffects();
  useEffect(() => {
    setDuration(secondsToDuration(clock.total_seconds - clock.seconds_passed));
  }, [clock]);
  const { start, stop, reset, remove } = useClock(clock);
  useIntervalWhen(
    () => {
      // When timer starts
      const sinceTotal = (Date.now() - clock.start_at.toMillis()) / 1000;
      if (sinceTotal >= 0 && 0.1 >= sinceTotal) {
        notify("Timer start");
        play();
      }
      // When timer ends
      const seconds =
        clock.total_seconds -
        clock.seconds_passed -
        (Date.now() - clock.start_at.toMillis()) / 1000;
      if (seconds <= 0 && -0.199 <= seconds) {
        notify("Timer ring");
        play();
      }

      const duration = secondsToDuration(seconds);
      setDuration(duration);
    },
    100,
    clock.running && !!clock.start_at,
    true
  );
  const toggle = () => {
    if (clock.running) stop();
    else start();
  };
  return {
    duration,
    toggle,
    reset,
    remove,
  };
};

export const ClockCard = React.memo((props: { clock: Clock }) => {
  const { clock } = props;
  const { duration, toggle, reset, remove } = useClockCard(clock);
  return (
    <div className="flex font-sans">
      <div className="p-3 bg-white rounded-lg shadow-md">
        <div className="flex flex-wrap">
          <h1 className="flex-auto text-lg font-semibold text-slate-900">
            <FirestoreInput doc={clock} field="name" />
          </h1>
          <p className="flex-auto text-lg font-semibold text-slate-900">
            ({clock.num_resets})
          </p>
          <p className="flex-auto text-lg font-semibold text-slate-900">
            {padZero(duration.hours)}:{padZero(duration.minutes)}:
            {duration.seconds.toFixed(1).padStart(4, "0")}
          </p>
        </div>
        <div className="flex space-x-4 mb-6 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            <button
              className="h-10 px-6 font-semibold rounded-md bg-black text-white"
              onClick={toggle}
            >
              {clock.running ? "Stop" : "Start"}
            </button>
            <button
              className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
              type="button"
              onClick={reset}
            >
              Reset
            </button>
            <button
              className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
              type="button"
              onClick={remove}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
