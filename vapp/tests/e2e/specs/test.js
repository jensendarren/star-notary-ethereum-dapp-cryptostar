// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  'the page should have the title Star Notary Service': (browser) => {
    browser
      .openHomepage()
      .assert.containsText('h1', 'Star Notary Service')
      .end();
  },
};
