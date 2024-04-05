import ChunkBold from '../components/ChunksViews/ChunkBold/ChunkBold';
import ChunkLink from '../components/ChunksViews/ChunkLink/ChunkLink';
import _ from 'lodash';

const MARKER = '()';

const LINK_REGEX = /\[(\d|\w|\s|\.|\-|\,|\!)+\]\((\d|\w|\s|\.|\-|\/|\:|\&|\?|\=)+\)/g;
const BOLD_REGEX = /\*\*([^\*])+\*\*/g;
const ITALIC_REGEX = /([^\*])\*([^\*])+\*([^\*])/g;

export const parseText = (text: string): (string | JSX.Element)[] => {
  return parseElements([text]);
};

const parseElements = (elementsToParse: (string | JSX.Element)[]): (string | JSX.Element)[] => {
  const linkParsedElements: (string | JSX.Element)[] = parse(elementsToParse, LINK_REGEX, parseLink);
  const boldParsedElements: (string | JSX.Element)[] = parse(linkParsedElements, BOLD_REGEX, parseBold);
  const italicParsedElements: (string | JSX.Element)[] = parse(boldParsedElements, ITALIC_REGEX, parseItalic);
  return italicParsedElements;
};

const parse = (
  elementsToParse: (string | JSX.Element)[],
  regex: RegExp,
  parseCallback: (part: string) => JSX.Element
): (string | JSX.Element)[] => {
  let parsedElements: (string | JSX.Element)[] = [];
  elementsToParse.forEach((element) => {
    if (typeof element === 'string') {
      parsedElements = parsedElements.concat(parseByRegex(element, regex, parseCallback));
    } else {
      parsedElements.push(element);
    }
  });
  return parsedElements;
};

const parseByRegex = (text: string, regex: RegExp, parseCallback: (part: string) => JSX.Element) => {
  const linkMatch = text.match(regex);
  let textToParse = text;
  if (_.isEmpty(linkMatch)) {
    return [text];
  } else {
    linkMatch?.forEach((match) => {
      textToParse = textToParse.replace(match, `${MARKER}${match}${MARKER}`);
    });
    return textToParse.split(MARKER).map((part) => {
      if (part.match(regex)) {
        return parseCallback(part);
      } else {
        return part;
      }
    });
  }
};

const parseLink = (part: string) => {
  const label = part.split('](')[0].replace('[', '');
  const url = part.split('](')[1].replace(')', '');
  return <ChunkLink text={label} url={url} />;
};

const parseBold = (part: string) => {
  const label = part.replaceAll('**', '');
  return <ChunkBold text={label} />;
};

const parseItalic = (part: string) => {
  const label = part.replaceAll('*', '');
  return <i>{label}</i>;
};
