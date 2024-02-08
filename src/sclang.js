/**
Language: sclang
Requires:
Author: Brian Heim <brianlheim@gmail.com>
Contributors: Brian Heim <brianlheim@gmail.com>, Dennis Scheiba <dennis.scheiba@gmx.de>
Category: audio, music, scripting, research
Description: sclang is the language for audio synthesis and algorithmic composition of the SuperCollider environment.
**/

module.exports = function (hljs) {
  const KEYWORDS = {
    keyword: "arg classvar|10 const super this var|2",
    built_in:
      "false inf|2 nil|2 true thisFunction|10 thisFunctionDef|10 thisMethod|10 " +
      "thisProcess|10 thisThread|10 currentEnvironment|10 topEnvironment|10",
  };

  const CLASS = {
    className: "type",
    begin: "\\b[A-Z]\\w*\\b",
    relevance: 0,
  };
  const PRIMITIVE = {
    className: "meta",
    begin: "_\\w+",
    relevance: 0,
  };
  const CHAR_LITERAL = {
    className: "literal",
    begin: "\\$\\\\?.",
  };
  const ENV_VAR = {
    className: "title",
    begin: "~\\w+",
    relevance: 2, // ~env vars are pretty common in SC
  };

  const NUMBER_RADIX_RE = "\\b\\d+r[0-9a-zA-Z]*(\\.[0-9A-Z]*)?\\b";
  const NUMBER_FLOAT_RE = "\\b((\\d+(\\.\\d+)?([eE][-+]?\\d+)?(pi)?)|pi)\\b";
  const NUMBER_INT_RE = "\\b0x[a-fA-F0-9]+\\b";
  const NUMBER_SCALE_RE = /\b\d+(s+|b+|[sb]\d+)\b/;
  const NUMBER = {
    className: "number",
    variants: [
      { begin: NUMBER_RADIX_RE },
      { begin: NUMBER_SCALE_RE },
      { begin: NUMBER_FLOAT_RE },
      { begin: NUMBER_INT_RE },
    ],
    relevance: 0,
  };

  const BLOCK_COMMENT = hljs.COMMENT(
    '/\\*', '\\*/',
    { contains: [ hljs.C_BLOCK_COMMENT_MODE ] }
  );

  return {
    aliases: ["supercollider", "sc"],
    name: "sclang",
    keywords: KEYWORDS,
    contains: [
      {
        className: "type",
        // relevance boost for common but sc-specific class names: Synth, SynthDef
        begin: /\b(Synth|SynthDef)\b/,
        relevance: 10,
      },
      CLASS,
      PRIMITIVE,
      CHAR_LITERAL,
      ENV_VAR,
      NUMBER,
      {
        className: "string",
        variants: [
          { begin: "\\\\\\w+", relevance: 5 }, // backslash syms are pretty common
          hljs.APOS_STRING_MODE,
          { begin: "[A-Za-z_]\\w*\\:", relevance: 0 },
        ],
      },

      hljs.QUOTE_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
        BLOCK_COMMENT
    ],
    // avoid common confusions: we don't declare classes with "class Aaa"
    illegal: /\bclass\s+[A-Z]/,
  };
};
