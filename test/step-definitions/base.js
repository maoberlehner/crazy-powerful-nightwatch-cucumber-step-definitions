const { client } = require(`nightwatch-cucumber`);
const cssToXPath = require(`css-to-xpath`);

const {
  PREFIXES,
  SUFFIXES,
  fromString,
  makeMatcher,
} = require(`../helpers/selector`);
const { When, Then } = require(`../helpers/step`);

const DEFAULT_TIMEOUT_IN_MS = 3000;

When(/^I open "(.*)"$/, url => client.url(url));

When(/^I enter "(.*)" (.*)$/, (value, string) => {
  const matcher = makeMatcher({ suffixes: [`field`, ...SUFFIXES] });
  const selector = fromString({ string, matcher });

  return client.useCss()
    .clearValue(selector)
    .setValue(selector, value);
});

When(/^I click (.*)$/, (string) => {
  const matcher = makeMatcher({
    prefixes: [`on a`, `on the`, `on`, ...PREFIXES],
    suffixes: [`button`, `link`, ...SUFFIXES],
  });
  const selector = fromString({ string, matcher });

  client.useCss().click(selector);
});

Then(/^the text "(.*)" should(n't| not)? be visible(.*)?$/, (text, not, string) => {
  const negate = not !== undefined;
  const matcher = makeMatcher();
  const selector = fromString({ string, matcher });
  const xPathSelector = selector
    ? cssToXPath.parse(selector)
      .where(cssToXPath.parse(`*`).text().contains(text))
      .toXPath()
    : `//*[contains(text(), '${text}')]`;

  let expect = client.useXpath().expect.element(xPathSelector);
  if (negate) expect = expect.not;

  return expect.to.be.present.before(DEFAULT_TIMEOUT_IN_MS);
});

Then(/^there should be (\d+) (.*)?elements (.*)$/, (n, elementString, string) => {
  const matcher = makeMatcher();
  const selector = fromString({ string, matcher });

  const elementMatcher = makeMatcher({
    prefixes: [`^`],
    suffixes: [` $`],
  });
  const elementSelector = fromString({
    string: elementString,
    matcher: elementMatcher,
  });

  const xPathSelector = cssToXPath
    .parse(`${selector} > ${elementSelector || `*`}`)
    .toXPath();

  return client.useXpath().expect
    .element(`${xPathSelector}[${n}]`)
    .to.be.present
    .before(DEFAULT_TIMEOUT_IN_MS);
});

Then(/^I should(n't| not)? see (.*?)(in the .*)?$/, (not, string, parentString) => {
  const matcher = makeMatcher({
    prefixes: [...PREFIXES, `the`, `an`, `a`, `^`],
    suffixes: [`$`],
  });
  const elementSelector = fromString({ string, matcher });

  const parentMatcher = makeMatcher();
  const parentSelector = fromString({
    string: parentString,
    matcher: parentMatcher,
  });

  const negate = not !== undefined;
  const selector = `${parentSelector} ${elementSelector}`;

  let expect = client.useCss().expect.element(selector);
  if (negate) expect = expect.not;

  return expect.to.be.present.before(DEFAULT_TIMEOUT_IN_MS);
});
