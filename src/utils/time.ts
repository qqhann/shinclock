export type Duration = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const DAY_IN_SEC = 86400;
const HOUR_IN_SEC = 3600;
const MINUTE_IN_SEC = 60;

export const secondsToDuration = (seconds: number): Duration => {
  const days = Math.trunc(seconds / DAY_IN_SEC);
  seconds %= DAY_IN_SEC;
  const hours = Math.trunc(seconds / HOUR_IN_SEC);
  seconds %= HOUR_IN_SEC;
  const minutes = Math.trunc(seconds / MINUTE_IN_SEC);
  seconds %= MINUTE_IN_SEC;
  return { days, hours, minutes, seconds };
};
export const durationToSeconds = (duration: Duration): number => {
  const { days, hours, minutes, seconds } = duration;
  return (
    days * DAY_IN_SEC + hours * HOUR_IN_SEC + minutes * MINUTE_IN_SEC + seconds
  );
};

export const padZero = (num: number): string => {
  return String(num).padStart(2, "0");
};
