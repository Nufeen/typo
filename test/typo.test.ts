import typo from '../src/typo'

import should from 'should'

describe('tests just work', () => {
  describe('typo is loaded correctly and test command works', () => {
    it('should be ok', () => {
      typo.should.be.ok()
      typo.should.be.a.Function()
    })
  })
})

describe('typo works correctly on non-string types', () => {
  describe('#indexof()', () => {
    it('should return what it gets if type is not a String', () => {
      typo(42).should.equal(42)
      typo([1, 2, 3]).should.eql([1, 2, 3])
      typo({ a: 1 }).should.eql({ a: 1 })
    })
    it('should proceed NaN, null and zero values correctly', () => {
      typo(0).should.equal(0)
      typo(NaN).should.eql(NaN)
      should(null).be.exactly(null)
    })
    it('should proceed booleans correctly', () => {
      typo(false).should.equal(false)
      typo(true).should.equal(true)
    })
  })
})

describe('Common patterns', () => {
  describe('dashes', () => {
    it('should turn hanging dash to bound mdash', () => {
      let s1 = 'о - ло - ло'
      let s2 = 'о&nbsp;&mdash; ло&nbsp;&mdash; ло'
      typo(s1).should.equal(s2)
    })
    it('should turn hanging middle dash to bound mdash', () => {
      let s1 = 'о - ло - ло'
      let s2 = 'о&nbsp;&mdash; ло&nbsp;&mdash; ло'
      typo(s1).should.equal(s2)
    })
  })
})

describe('Common patterns: preposiciones', () => {
  // There is no need to test common cases,
  // test will be huge and evident,
  // this part tests tricky cases instead
  it('should bind preposiciones', () => {
    let s1 = 'Да, но об одном я не знал'
    let s2 = 'Да, но&nbsp;об&nbsp;одном я не&nbsp;знал'
    typo(s1).should.equal(s2)
  })
  it('should bind preposiciones', () => {
    let s1 = 'Но нет'
    let s2 = 'Но&nbsp;нет'
    typo(s1).should.equal(s2)
  })
  it('should bind preposiciones', () => {
    let s1 = 'Одно но'
    let s2 = 'Одно но'
    typo(s1).should.equal(s2)
  })
  it('should bind preposiciones', () => {
    let s1 = 'Но об одном я не знал'
    let s2 = 'Но&nbsp;об&nbsp;одном я не&nbsp;знал'
    typo(s1).should.equal(s2)
  })
  it('should bind preposiciones', () => {
    let s1 = 'Но о том не узнает никто'
    let s2 = 'Но&nbsp;о&nbsp;том не&nbsp;узнает никто'
    typo(s1).should.equal(s2)
  })
})

describe('Digits', () => {
  it('should bind digits to both sides', () => {
    typo(' 0 ', { digits: true }).should.equal('&nbsp;0&nbsp;')
    typo(' 1 ', { digits: true }).should.equal('&nbsp;1&nbsp;')
    typo(' 12 ', { digits: true }).should.equal('&nbsp;12&nbsp;')
  })
})

describe('DigitsR', () => {
  it('should bind digits to LEFT side', () => {
    typo(' 0 ', { digitsR: true }).should.equal(' 0&nbsp;')
    typo(' 1 ', { digitsR: true }).should.equal(' 1&nbsp;')
    typo(' 12 ', { digitsR: true }).should.equal(' 12&nbsp;')
  })
})

describe('Hyphens', () => {
  it('should add hyphens', () => {
    let s1 = 'Но об одном я не знал'
    let s2 = 'Но&nbsp;об&nbsp;од&shy;ном я не&nbsp;знал'
    typo(s1, { hyphens: true }).should.equal(s2)
  })
})

describe('Quotes', () => {
  it('should transform quotes', () => {
    let s1 = 'Текст "в кавычках" после'
    let s2 = 'Текст «в кавычках» после'
    typo(s1, { quotes: true }).should.equal(s2)
  })

  it('should handle simple case of nested quotes', () => {
    let s1 = 'Обратиться в ООО "Компания "Рога и Ко."'
    let s2 = 'Обратиться в&nbsp;ООО «Компания «Рога и&nbsp;Ко.»'
    typo(s1, { quotes: true }).should.equal(s2)
  })

  it('should handle quoted digits', () => {
    let s1 = 'Не стоит использовать "1984" как инструкцию'
    let s2 = 'Не&nbsp;стоит использовать «1984» как инструкцию'
    typo(s1, { quotes: true }).should.equal(s2)
  })

  it('should handle simple case of multiple quoted parts', () => {
    let s1 = 'Голосование: "Быть" против "Не быть"'
    let s2 = 'Голосование: «Быть» против «Не быть»'
    typo(s1, { quotes: true }).should.equal(s2)
  })
})

describe('Tags sanitization', () => {
  it('should return <nobr /> as is', () => {
    const actual = 'Но об одном <nobr>я не знал</nobr>'
    const expected = 'Но&nbsp;об&nbsp;одном <nobr>я не&nbsp;знал</nobr>';

    typo(actual).should.equal(expected)
  })
})