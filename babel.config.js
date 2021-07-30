module.exports = {
  "presets": {
    "presets": [
      [
        "babel-preset-gatsby",
        {
          "reactRuntime": "automatic",
          "reactImportSource": "@emotion/react"
        }
      ]
    ]
  },
  "plugins": ["@emotion/babel-plugin"]
}
