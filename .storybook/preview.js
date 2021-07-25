import { ThemeProvider } from "@emotion/react";
import { defaultTheme } from "../src/theme";
import Layout from "../src/Layout";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "fullscreen",
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={defaultTheme}>
      <Layout>
        <Story />
      </Layout>
    </ThemeProvider>
  )
]
