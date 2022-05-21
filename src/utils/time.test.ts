import { Duration, secondsToDuration } from "./time";

it("converts seconds to duration", () => {
  const res = secondsToDuration(62);
  expect(res).toStrictEqual({
    days: 0,
    hours: 0,
    minutes: 1,
    seconds: 2,
  } as Duration);
});

it("converts minus seconds to duration", () => {
  const res = secondsToDuration(-62);
  expect(res).toStrictEqual({
    days: -0,
    hours: -0,
    minutes: -1,
    seconds: -2,
  } as Duration);
});
