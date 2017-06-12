import typo from '../src/typo.js'

// var should = require('should');

/* console.log(0); */
/* (5).should.be.exactly(5).and.be.a.Number(); */

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
      typo(0).should.equal(0)
      // TODO`
      // typo(null).should.not.exist()
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

describe('Digits', function() {
    it('should bind digits to both sides', function() {
      let s1 = ' 1 '
      let s2 = '&nbsp;1&nbsp;'
      typo(s1, { digits: true }).should.equal(s2)
    })
})
