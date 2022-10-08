const spacingUnitInPixels = 8;

export const spacing = (...argsInput: number[]): string => {
  const args = argsInput.length === 0 ? [1] : argsInput;
  return args.map((arg) => `${arg * spacingUnitInPixels}px`).join(" ");
};

const breakpointValues = {
  mobile: "1000px",
  maxWidth: `${1270 + spacingUnitInPixels * 3 * 2}px`,
};

export const breakpoints = {
  ...breakpointValues,
  down: (bp: keyof typeof breakpointValues) =>
    `(max-width: ${breakpointValues[bp]})`,
  up: (bp: keyof typeof breakpointValues) =>
    `(min-width: ${breakpointValues[bp]})`,
};
