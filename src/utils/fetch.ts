import axios from "axios";
import "dotenv/config";

const contentfulGraphQlApiUrl = `https://graphql.contentful.com/content/v1/spaces`;
const instance = axios.create({
  baseURL: contentfulGraphQlApiUrl,
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN!}`,
    "Content-Type": "application/json; charset=utf-8",
  },
  timeout: 1000,
});

export async function fetchContentfulGraphQl<T = any>(
  query: string,
  variables: unknown = {}
): Promise<T> {
  let response = null;
  try {
    response = await instance.post<{ data: T }>(
      "/" + process.env.CONTENTFUL_SPACE_ID!,
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
    console.error((e as any).toJSON());
    throw e;
  }
}
