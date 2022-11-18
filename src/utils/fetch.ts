import axios from "axios";
import "dotenv/config";

const contentfulGraphQlApiUrl = `https://graphql.contentful.com/content/v1/spaces`;
const instance = axios.create({
  baseURL: contentfulGraphQlApiUrl,
  headers: {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN!}`,
    "Content-Type": "application/json; charset=utf-8",
  },
  timeout: 5000,
});

export async function fetchContentfulGraphQl<T = unknown>(
  query: string,
  variables: unknown = {}
): Promise<T> {
  let response = null;
  try {
    response = await instance.post<{ data: T }>(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      `/${process.env.CONTENTFUL_SPACE_ID!}${
        process.env.CONTENTFUL_ENVIRONMENT
          ? `/environments/${process.env.CONTENTFUL_ENVIRONMENT}`
          : ""
      }`,
      {
        query,
        variables,
      }
    );
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data.data;
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.error((e as any).toJSON());
    throw e;
  }
}
