// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  'the page should have the title Star Notary Service': (browser) => {
    browser
      .openHomepage()
      .assert.containsText('h1', 'Star Notary Service')
      .end();
  },

  'it should be possible to claim a new star via the homepage form': (browser) => {
    browser
      .openHomepage()
      .waitForElementVisible('#starFormCard', 1000)
      .setValue( "#starFormCard #fieldName", 'North Star' )
      .setValue( "#starFormCard #fieldTokenId", '929292' )
      .setValue( "#starFormCard #fieldDeclination", '1' )
      .setValue( "#starFormCard #fieldMagnitude", '10' )
      .click("#btnCreateStar")
      .pause(8000)
      // cannot assert this until we can avoid requiring to sign the
      // transaction with MetaMask. Possibile solution is to sign
      // the transaction dynamically in the application specifically for this test
      // .assert.containsText('#app', 'StarClaimedEvent')
      .end()
  },

  'look up the new star shows the expected star name': (browser) => {
    browser
      .openHomepage()
      .waitForElementVisible('#starViewCard', 8000)
      .setValue( "#starViewCard #fieldTokenId", '1111' )
      .click("#btnGetStarInfo")
      .pause(1000)
      .assert.containsText('#starViewCard #name', 'Dadou')
      .end()
  }
};
