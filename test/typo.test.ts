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
      let s2 = 'о — ло — ло'
      typo(s1).should.equal(s2)
    })
    it('should turn hanging middle dash to bound mdash', () => {
      let s1 = 'о - ло - ло'
      let s2 = 'о — ло — ло'
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
    let s2 = 'Да, но об одном я не знал'
    typo(s1).should.equal(s2)
  })
  it('should bind preposiciones', () => {
    let s1 = 'Но нет'
    let s2 = 'Но нет'
    typo(s1).should.equal(s2)
  })
  it('should bind preposiciones', () => {
    let s1 = 'Одно но'
    let s2 = 'Одно но'
    typo(s1).should.equal(s2)
  })
  it('should bind preposiciones', () => {
    let s1 = 'Но об одном я не знал'
    let s2 = 'Но об одном я не знал'
    typo(s1).should.equal(s2)
  })
  it('should bind preposiciones', () => {
    let s1 = 'Но о том не узнает никто'
    let s2 = 'Но о том не узнает никто'
    typo(s1).should.equal(s2)
  })
})

describe('Digits', () => {
  it('should bind digits to both sides', () => {
    typo(' 0 ', { digits: true }).should.equal(' 0 ')
    typo(' 1 ', { digits: true }).should.equal(' 1 ')
    typo(' 12 ', { digits: true }).should.equal(' 12 ')
  })
})

describe('DigitsR', () => {
  it('should bind digits to LEFT side', () => {
    typo(' 0 ', { digitsR: true }).should.equal(' 0 ')
    typo(' 1 ', { digitsR: true }).should.equal(' 1 ')
    typo(' 12 ', { digitsR: true }).should.equal(' 12 ')
  })
})

describe('Hyphens', () => {
  it('should add hyphens', () => {
    let s1 = 'Но об одном я не знал'
    let s2 = 'Но об од­ном я не знал'
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
    let s2 = 'Обратиться в ООО «Компания «Рога и Ко.»'
    typo(s1, { quotes: true }).should.equal(s2)
  })

  it('should handle quoted digits', () => {
    let s1 = 'Не стоит использовать "1984" как инструкцию'
    let s2 = 'Не стоит использовать «1984» как инструкцию'
    typo(s1, { quotes: true }).should.equal(s2)
  })

  it('should handle simple case of multiple quoted parts', () => {
    let s1 = 'Голосование: "Быть" против "Не быть"'
    let s2 = 'Голосование: «Быть» против «Не быть»'
    typo(s1, { quotes: true }).should.equal(s2)
  })

  it('should preserve HTML attributes as is', () => {
    const s1 = '<p>"Но об "одном" <a href="https://github.com" target="_blank" rel="nofollow">я не знал</a></p>'
    const s2 = '<p>«Но об «одном» <a href="https://github.com" target="_blank" rel="nofollow">я не знал</a></p>'

    typo(s1, { quotes: true }).should.equal(s2)
  })

  it('should preserve HTML attributes containing spaces as is', () => {
    const s1 = '<p>"Но об "одном" <a class="comment first" href="https://github.com" target="_blank" rel="nofollow noopener norefferer">я не знал</a></p>'
    const s2 = '<p>«Но об «одном» <a class="comment first" href="https://github.com" target="_blank" rel="nofollow noopener norefferer">я не знал</a></p>'

    typo(s1, { quotes: true }).should.equal(s2)
  })
})

describe('Tags sanitization', () => {
  it('should return <nobr /> as is', () => {
    const s1 = 'Но об одном <nobr>я не знал</nobr>'
    const s2 = 'Но об одном <nobr>я не знал</nobr>';

    typo(s1).should.equal(s2)
  })
})

describe('HTML Entries', () => {
  it('replaces &nbsp;', () => {
    const s1 = 'Но об&nbsp;одном я не&nbsp;знал';
    const s2 = 'Но об одном я не знал';

    typo(s1).should.equal(s2);
  })
})