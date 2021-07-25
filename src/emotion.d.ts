import "@emotion/react";

type TypographyProps = Partial<{
  size: number;
  family: string;
}>;

declare module "@emotion/react" {
  export interface Theme {
    palette: Record<string, string>;
    typography: {
      body: TypographyProps;
    };
    spacing: (multiple: number) => string;
  }
}
