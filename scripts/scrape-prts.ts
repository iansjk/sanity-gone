import { load } from "cheerio";
import axios from "axios";

const PRTS_OPERATOR_LIST_URL =
  "https://prts.wiki/w/%E5%B9%B2%E5%91%98%E4%B8%8A%E7%BA%BF%E6%97%B6%E9%97%B4%E4%B8%80%E8%A7%88";

export async function getReleaseOrderAndLimitedLookup() {
  const res = await axios.get(PRTS_OPERATOR_LIST_URL);
  const $ = load(res.data);

  const releaseDateLimitedLookup: {
    [cnName: string]: {
      isLimited: boolean;
      releaseOrder: number;
    };
  } = {};
  $("#mw-content-text tr:has(td)").each((i, el) => {
    const [
      cnName,
      _rarity,
      _releaseDateTime,
      _launchObtainSource,
      obtainSource,
      _announcement,
    ] = $(el)
      .find("td")
      .map((_, el) => $(el).text());
    releaseDateLimitedLookup[cnName] = {
      isLimited: obtainSource.startsWith("限定"),
      releaseOrder: i + 1,
    };
  });

  return releaseDateLimitedLookup;
}
