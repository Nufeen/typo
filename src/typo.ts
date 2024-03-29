const any = "[абвгдеёжзийклмнопрстуфхцчшщъыьэюя]";
const vowel = "[аеёиоуыэюя]";
const consonant = "[бвгджзклмнпрстфхцчшщ]";
const sign = "[йъь]";
const shy = "­"; // &shy;
const nonBreakingHyphen = "‑"; // &#8209;
const nonBreakingSpace = " "; // &nbsp;
const dash = "—"; // &mdash;
const nonBreakingDash = "–"; // &#8211;
const openingQuote = "«";
const closingQuote = "»";

const preposiciones = {
  corto: "и|а|в|к|у|с|о|не|но|на|из|от|об|до|по|во|за|со",
  largo: "над|под|как",
};

const defaultOptions = {
  hyphens: false,
  digits: false,
  digitsR: false,
  header: false,
  ndash: false,
  quotes: false,
};

const patterns: Record<
  keyof typeof defaultOptions | "common",
  Array<[RegExp, string]>
> = {
  common: [
    [new RegExp("&nbsp;", "gi"), nonBreakingSpace],
    [new RegExp(" (-|–|—) ", "g"), `${nonBreakingSpace}${dash} `],
    [new RegExp(" {2}", "g"), " "],
    [new RegExp("-(й|я|е) ", "g"), `${nonBreakingHyphen}$1 `], // TODO TESTS
    [new RegExp("-(й|я|е) ", "g"), `${nonBreakingHyphen}$1${nonBreakingSpace}`], // TODO TESTS
    [new RegExp(` (${preposiciones.corto}) `, "gi"), ` $1${nonBreakingSpace}`],
    [
      new RegExp(`${nonBreakingSpace}(${preposiciones.corto}) `, "gi"),
      `${nonBreakingSpace}$1${nonBreakingSpace}`,
    ],
    [new RegExp(`^(${preposiciones.corto}) `, "gi"), `$1${nonBreakingSpace}`],
  ],

  digits: [
    [new RegExp(" (\\d+) ", "g"), `${nonBreakingSpace}$1${nonBreakingSpace}`],
    [
      new RegExp(`${nonBreakingSpace}(\\d+) `, "g"),
      `${nonBreakingSpace}$1${nonBreakingSpace}`,
    ], // TODO TESTS
  ],

  digitsR: [[new RegExp(" (\\d+) ", "g"), ` $1${nonBreakingSpace}`]],

  // LIKELY TO BE RENAMED AND EXTENDED (FOR MORE GENERAL DASH HANDLING),
  // USE WITH CAUTION
  ndash: [[new RegExp("-", "g"), `${nonBreakingDash}`]], // TODO DOC SECTION

  header: [
    [new RegExp(` (${preposiciones.largo}) `, "gi"), ` $1${nonBreakingSpace}`],
  ],

  hyphens: [
    [new RegExp(`(${sign})(${any}${any})`, "ig"), `$1${shy}$2`],
    [new RegExp(`(${vowel})(${vowel}${any})`, "ig"), `$1${shy}$2`],
    [
      new RegExp(`(${vowel}${consonant})(${consonant}${vowel})`, "ig"),
      `$1${shy}$2`,
    ],
    [
      new RegExp(`(${consonant}${vowel})(${consonant}${vowel})`, "ig"),
      `$1${shy}$2`,
    ],
    [
      new RegExp(
        `(${vowel}${consonant})(${consonant}${consonant}${vowel})`,
        "ig"
      ),
      `$1${shy}$2`,
    ],
    [
      new RegExp(
        `(${vowel}${consonant}${consonant})(${consonant}${consonant}${vowel})`,
        "ig"
      ),
      `$1${shy}$2`,
    ],
  ],

  quotes: [
    [new RegExp('\\="([^"]*)"', "gmi"), "='$1'"], // prevents HTML attributes like href="https://github.com" from being broken
    [new RegExp(`"(${any}|[0-9])`, "gmi"), `${openingQuote}$1`],
    [new RegExp(`"`, "gmi"), closingQuote],
    [new RegExp("\\='([^']*)'", "gmi"), '="$1"'], // prevents HTML attributes like href="https://github.com" from being broken
  ],
};

// typo :: String -> Object -> String
export default function typo<T>(
  s: T,
  options: Partial<typeof defaultOptions> = defaultOptions
): T | string {
  if (s == null || typeof s !== "string") {
    return s;
  }

  const P = Object.keys(patterns).reduce((acc, key) => {
    return options[key] ? acc.concat(patterns[key]) : acc;
  }, patterns.common);

  return P.reduce((acc, p) => acc.replace(p[0], p[1]), s);
}
