import axios from "axios";
import "dotenv/config";

if (process.env.CONTENTFUL_ACCESS_TOKEN == null) {
  throw new Error("CONTENTFUL_ACCESS_TOKEN is not defined");
}
if (process.env.CONTENTFUL_SPACE_ID == null) {
  throw new Error("CONTENTFUL_SPACE_ID is not defined");
}
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;

const contentfulGraphQlApiUrl = `https://graphql.contentful.com/content/v1/spaces`;
const instance = axios.create({
  baseURL: contentfulGraphQlApiUrl,
  headers: {
    Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
    "Content-Type": "application/json; charset=utf-8",
  },
  timeout: 1000,
  validateStatus: () => true, // we'll check it ourselves & log better error info
});
instance.interceptors.request.use((config) => {
  if (config.method && config.url) {
    console.log(
      `${config.method.toUpperCase()} ${config.baseURL ?? ""}${config.url}`
    );
  }
  return config;
});

export async function fetchContentfulGraphQl<T = any>(
  query: string,
  variables: unknown = {}
): Promise<T> {
  let response = null;
  const url = `/${CONTENTFUL_SPACE_ID}${
    process.env.CONTENTFUL_ENVIRONMENT != null
      ? `/environments/${process.env.CONTENTFUL_ENVIRONMENT}`
      : ""
  }`;
  response = await instance.post<{ data: T }>(url, {
    query,
    variables,
  });
  if (!(response.status >= 200 && response.status < 300)) {
    if ((response.data as any).errors != null) {
      console.error(response.data);
      throw new Error(
        (response.data as any).errors
          .map(
            (error: {
              message: string;
              locations: Array<{ line: number; column: number }>;
            }) => {
              if (error.locations != null) {
                return `${error.message} (query ${error.locations
                  .map(({ line, column }) => `line ${line}, column ${column}`)
                  .join("; ")})`;
              }
              return error.message;
            }
          )
          .join("\n")
      );
    }
    throw new Error(response.statusText);
  }
  return response.data.data;
}
