import typo from '../src/typo.js'

const should = require('should');

describe('tests just work', function() {
  describe('typo is loaded correctly and test command works', function() {
    it('should be ok', function() {
      typo.should.be.ok()
      typo.should.be.a.Function()
    })
  })
})

describe('typo works correctly on non-string types', function() {
  describe('#indexof()', function() {
    it('should return what it gets if type is not a String', function() {
      typo(42).should.equal(42)
      typo([1,2,3]).should.eql([1,2,3])
      typo({a: 1}).should.eql({a: 1})
    })
    it('should proceed NaN, null and zero values correctly', function() {
      typo(0).should.equal(0)
      typo(NaN).should.eql(NaN)
      should(null).be.exactly(null)
    })
    it('should proceed booleans correctly', function() {
      typo(false).should.equal(false)
      typo(true).should.equal(true)
    })
  })
})

describe('Common patterns', function() {
  describe('dashes', function() {
    it('should turn hanging dash to bound mdash', function() {
      let s1 = 'о - ло - ло'
      let s2 = 'о&nbsp;&mdash; ло&nbsp;&mdash; ло'
      typo(s1).should.equal(s2)
    })
    it('should turn hanging middle dash to bound mdash', function() {
      let s1 = 'о - ло - ло'
      let s2 = 'о&nbsp;&mdash; ло&nbsp;&mdash; ло'
      typo(s1).should.equal(s2)
    })
  })
})

describe('Common patterns: preposiciones', function() {
  // There ins no need to test common cases,
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

describe('Digits', function() {
    it('should bind digits to both sides', function() {
      typo(' 0 ', { digits: true }).should.equal('&nbsp;0&nbsp;')
      typo(' 1 ', { digits: true }).should.equal('&nbsp;1&nbsp;')
      typo(' 12 ', { digits: true }).should.equal('&nbsp;12&nbsp;')
    })
})

describe('DigitsR', function() {
    it('should bind digits to LEFT side', function() {
      typo(' 0 ', { digitsR: true }).should.equal(' 0&nbsp;')
      typo(' 1 ', { digitsR: true }).should.equal(' 1&nbsp;')
      typo(' 12 ', { digitsR: true }).should.equal(' 12&nbsp;')
    })
})

describe('DigitsR', function() {
    it('should bind digits to LEFT side', function() {
      typo(' 0 ', { digitsR: true }).should.equal(' 0&nbsp;')
      typo(' 1 ', { digitsR: true }).should.equal(' 1&nbsp;')
      typo(' 12 ', { digitsR: true }).should.equal(' 12&nbsp;')
    })
})
