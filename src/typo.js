const all = '[абвгдеёжзийклмнопрстуфхцчшщъыьэюя]'
const glas = '[аеёиоуыэюя]' // vowels
const sogl = '[бвгджзклмнпрстфхцчшщ]' //consonants
const zn = '[йъь]'
const shy = '\xAD'

const preposiciones = {
  corto: 'и|а|в|к|у|с|о|не|но|на|из|от|об|до|по',
  largo: 'над|под|как'
}

const patterns = {
  // Привязка предлогов, замена тире (по умолчанию)
  common: [
    [new RegExp(' (-|–|—) ', 'g'), '&nbsp;— '],
    [new RegExp(' {2}', 'g'), ' '],
    [new RegExp(` (${preposiciones.corto}) `, 'gi'), ' $1&nbsp;']
  ],
  // При достаточно широкой колонке цифры привязываются с двух сторон
  digits: [
    [new RegExp(' (\\d+) ', 'g'), '&nbsp;$1&nbsp;']
  ],
  // В некоторых случаях имеет смысл привязывать цифры слева (1_whatever)
  digitsR: [
    [new RegExp(' (\\d+) ', 'g'), ' $1&nbsp;']
  ],
  // В заголовках приклеиваются длинные предлоги
  header: [
    [new RegExp(` (${preposiciones.largo}) `, 'gi'), ' $1&nbsp;']
  ],
  // Регулярки для переносов взяты с
  // http://vyachet.ru/hyphen-russian-html-text/
  hypherns: [
    [new RegExp(`(${zn})(${all}${all})`, 'ig'), `$1${shy}$2`],
    [new RegExp(`(${glas})(${glas}${all})`, 'ig'), `$1${shy}$2`],
    [new RegExp(`(${glas}${sogl})(${sogl}${glas})`, 'ig'), `$1${shy}$2`],
    [new RegExp(`(${sogl}${glas})(${sogl}${glas})`, 'ig'), `$1${shy}$2`],
    [new RegExp(`(${glas}${sogl})(${sogl}${sogl}${glas})`, 'ig'), `$1${shy}$2`],
    [new RegExp(`(${glas}${sogl}${sogl})(${sogl}${sogl}${glas})`, 'ig'), `$1${shy}$2`]
  ]
}

const defaults = {
  hypherns: false,
  digits: false,
  digitsR: false,
  header: false
}

// typo :: String -> Object -> String
export default function typo(s, options = defaults) {
  if (s == null) {
    return s
  }

  const P = Object.keys(patterns).reduce((acc, key) => {
    return options[key] ? acc.concat(patterns[key]) : acc
  }, patterns.common)

  let out = s.toString()

  P.forEach(p => {
    out = out.replace(p[0], p[1])
  })

  return out
}
