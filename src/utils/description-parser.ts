import XRegExp, {MatchRecursiveValueNameMatch} from "xregexp";
import {html} from "gatsby/dist/redux/reducers";

export interface InterpolatedValue {
  key: string;
  value: number;
}

const descriptionTagLeftDelim = "<(?!span)[^>/]+>";
const descriptionTagRightDelim = "</>";
//<(?<tagName>[^>]+)>(?<tagContent>[^<]+)<\/>/;
const descriptionInterpolationRegex =
  /-?{-?(?<interpolationKey>[^}:]+)(?::(?<formatString>[^}]+))?}/;
/**
 * converts game-internal skill description representations into an html-formatted description.
 * there are three tag types that are all closed with "</>":
 * - <@ba.vup>: value up, for increases
 * - <@ba.vdown>: value down, for decreases
 * - <@ba.rem>: reminder, for reminder text
 * in addition, the "blackboard" property contains values that can be interpolated into the
 * skill description using curly braces (like {this}). the {curly brace syntax} also accepts a format string,
 * e.g. {foo:0%} will interpolate the numeric value "foo" in "blackboard" and display it as a percentage.
 */
export const descriptionToHtml = (
  description: string,
  interpolation: InterpolatedValue[]
): string => {
  let htmlDescription = description.slice();
  let recursiveMatch: MatchRecursiveValueNameMatch[] | null = null;
  let match: RegExpMatchArray | null = null;
  do {
    recursiveMatch = XRegExp.matchRecursive(htmlDescription, descriptionTagLeftDelim, descriptionTagRightDelim, 'g', {
      valueNames: ['between', 'tagName', 'tagContent', 'closingTag']
    });

    if (recursiveMatch.length > 0) {
      let resultingString = "";
      for(let i = 0; i < recursiveMatch.length; i++) {
        if(recursiveMatch[i].name === 'between') {
          resultingString += recursiveMatch[i].value;
        } else if(recursiveMatch[i].name === 'tagName') {
          const tagName = recursiveMatch[i].value.slice(1, -1);
          let className = "";
          switch (tagName) {
            case "@ba.vup":
              className = "value-up";
              break;
            case "@ba.vdown":
              className = "value-down";
              break;
            case "@ba.rem":
              className = "reminder-text";
              break;
            default:
              if(tagName.slice(0, 1) === '$') {
                className = "skill-tooltip";
                break;
              }
              console.warn(`Unrecognized tag: ${tagName}`);
              break;
          }
          resultingString += `<span class="${className}">`
        } else if (recursiveMatch[i].name === 'tagContent') {
          resultingString += recursiveMatch[i].value;
        } else if (recursiveMatch[i].name === 'closingTag') {
          resultingString += "</span>";
        }
      }

      htmlDescription = resultingString;
    }
  } while (recursiveMatch.length > 0);

  // replace any newlines with <br> tags to get past HTML whitespace collapsing
  htmlDescription = htmlDescription.replaceAll("\n", "<br>");

  do {
    match = descriptionInterpolationRegex.exec(htmlDescription);
    if (match?.groups) {
      const key = match.groups.interpolationKey;
      const value = interpolation.find((value) => value.key === key)?.value;
      if (!value) {
        throw new Error(`Couldn't find matching interpolation key: ${key}`);
      }
      let interpolated = "";
      const { formatString } = match.groups;
      if (typeof formatString === "undefined") {
        interpolated = `${value}`;
      } else if (formatString === "0%") {
        // convert to percentage and suffix with "%"
        interpolated = `${Math.round(value * 100)}%`;
      } else if (formatString === "0.0") {
        // return as-is to one-decimal place
        interpolated = `${value.toFixed(1)}`;
      } else {
        console.warn(
          `Unrecognized format string: ${match.groups.formatString}`
        );
      }
      htmlDescription = htmlDescription.replace(
        descriptionInterpolationRegex,
        interpolated
      );
    }
  } while (match);

  return htmlDescription;
};
