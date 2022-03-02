import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeRewrite from "rehype-rewrite";
import rehypeStringify from "rehype-stringify";

const selfClosingTagRegex = /^<([^>]+) \/>$/;

/**
 * Converts a markdown string to an HTML string.
 *
 * Also converts `<SelfClosingComponent />` syntax to `<selfclosingcomponent></selfclosingcomponent>`
 * (so that it can be processed correctly by `html-react-parser` later).
 *
 * @param markdown The Markdown string to convert. May contain component references (e.g. `<SomeComponent />`).
 */
export const markdownToHtmlString = async (markdownString: string) => {
  const vfile = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRewrite, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rewrite: (node: any) => {
        // custom components like <SkillInfo /> will get parsed as "raw"
        // because self-closing syntax isn't supported; if we pass it through without changing it,
        // it only gets closed at the very end of the string (instead of closing immediately)
        // so if we encounter a string like this, we convert it into an element with an empty body
        if (node.type === "raw") {
          const match = selfClosingTagRegex.exec(node.value);
          if (match && match[1] != null) {
            const componentName = match[1];
            node.type = "element";
            node.tagName = componentName.toLowerCase();
            node.value = "";
            node.properties = {};
            node.children = [];
          } else {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            console.warn(`Unrecognized raw node: ${node.value}`, node);
          }
        }
      },
    })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdownString);
  return vfile.toString();
};
