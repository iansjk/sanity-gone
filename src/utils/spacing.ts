import { createUnarySpacing } from "./spacingUtil";

export type SpacingOptions =
  | number
  | Spacing
  | ((abs: number) => number | string)
  | ((abs: number | string) => number | string)
  | ReadonlyArray<string | number>;

export type SpacingArgument = number | string;

// The different signatures imply different meaning for their arguments that can't be expressed structurally.
// We express the difference with variable names.
/* tslint:disable:unified-signatures */
export interface Spacing {
  (): string;
  (value: number): string;
  (topBottom: SpacingArgument, rightLeft: SpacingArgument): string;
  (
    top: SpacingArgument,
    rightLeft: SpacingArgument,
    bottom: SpacingArgument
  ): string;
  (
    top: SpacingArgument,
    right: SpacingArgument,
    bottom: SpacingArgument,
    left: SpacingArgument
  ): string;
}
/* tslint:enable:unified-signatures */

export default function createSpacing(
  spacingInput: SpacingOptions = 8
): Spacing {
  // Already transformed.
  if ((spacingInput as any).mui) {
    return spacingInput as Spacing;
  }

  // Material Design layouts are visually balanced. Most measurements align to an 8dp grid, which aligns both spacing and the overall layout.
  // Smaller components, such as icons, can align to a 4dp grid.
  // https://material.io/design/layout/understanding-layout.html#usage
  const transform = createUnarySpacing(8);

  const spacing = (...argsInput: ReadonlyArray<number | string>): string => {
    if (process.env.NODE_ENV !== "production") {
      if (!(argsInput.length <= 4)) {
        console.error(
          `Too many arguments provided, expected between 0 and 4, got ${argsInput.length}`
        );
      }
    }

    const args = argsInput.length === 0 ? [1] : argsInput;

    return args
      .map((argument) => {
        const output = transform(argument);
        return typeof output === "number" ? `${output}px` : output;
      })
      .join(" ");
  };

  return spacing;
}
