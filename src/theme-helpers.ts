const spacingUnitInPixels = 8;

export const spacing = (...argsInput: number[]): string => {
  const args = argsInput.length === 0 ? [1] : argsInput;
  return args.map((arg) => `${arg * spacingUnitInPixels}px`).join(" ");
};

export const rawBreakpointValues = {
  mobile: 1000,
  maxWidth: 1270 + spacingUnitInPixels * 3 * 2,
};

const breakpointValues = Object.fromEntries(
  Object.entries(rawBreakpointValues).map(([key, value]) => [key, `${value}px`])
) as Record<keyof typeof rawBreakpointValues, string>;

export const breakpoints = {
  ...breakpointValues,
  down: (bp: keyof typeof breakpointValues) =>
    `(max-width: ${breakpointValues[bp]})`,
  up: (bp: keyof typeof breakpointValues) =>
    `(min-width: ${breakpointValues[bp]})`,
};
