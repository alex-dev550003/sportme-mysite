const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
function load(relativePath, mocks = {}, cache = new Map()) {
  const file = path.resolve(root, relativePath);
  if (cache.has(file)) return cache.get(file);
  if (file.endsWith('.json')) return JSON.parse(fs.readFileSync(file, 'utf8'));
  const module = { exports: {} };
  cache.set(file, module.exports);
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(code, {
    exports: module.exports,
    module,
    require: (name) => {
      if (name in mocks) return mocks[name];
      if (!name.startsWith('.')) return require(name);
      const target = path.resolve(path.dirname(file), name);
      return load(path.extname(target) ? target : target + '.ts', mocks, cache);
    },
  }, { filename: file });
  return module.exports;
}

const { languages, detectVisitorLanguage, languageFromLocale } = load('app/app/languages.ts');
const { translateText } = load('app/app/public-locales.ts');
const { translateDocumentText } = load('app/app/content-locales.ts');
const { siteCopy } = load('app/app/seo-copy.ts');
const { getPublicMonthlyPremiumPrice } = load('lib/public-pricing.ts');
const newLanguages = ['PL', 'HU', 'CS', 'DA', 'SV', 'NO', 'IS', 'TR'];

test('browser language takes priority over location, with country and English fallbacks', () => {
  assert.equal(detectVisitorLanguage('RO', ['pl-PL', 'en-US']), 'PL');
  assert.equal(detectVisitorLanguage('PL', ['ro-RO']), 'RO');
  assert.equal(detectVisitorLanguage('CH', ['fr-CH', 'de-CH']), 'FR');
  assert.equal(detectVisitorLanguage('CZ', ['xx-XX', 'cs-CZ']), 'CS');
  for (const [country, code] of Object.entries({ PL: 'PL', HU: 'HU', CZ: 'CS', DK: 'DA', SE: 'SV', NO: 'NO', IS: 'IS', TR: 'TR', LI: 'DE' })) {
    assert.equal(detectVisitorLanguage(country, ['xx-XX']), code);
  }
  assert.equal(detectVisitorLanguage('JP', ['ja-JP']), 'EN');
  assert.equal(detectVisitorLanguage(undefined, []), 'EN');
  assert.equal(languageFromLocale('nb-NO'), 'NO');
  assert.equal(languageFromLocale('nn-NO'), 'NO');
  assert.equal(languageFromLocale('no-NO'), 'NO');
  assert.equal(languageFromLocale('  cs_CZ  '), 'CS');
  assert.equal(languageFromLocale('tr-TR'), 'TR');
});

async function serverLanguage(cookieValues, headerValues) {
  const mocks = {
    react: { cache: (fn) => fn },
    'next/headers': {
      cookies: async () => ({ get: (name) => cookieValues[name] ? { value: cookieValues[name] } : undefined }),
      headers: async () => ({ get: (name) => headerValues[name] ?? null }),
    },
  };
  return load('app/app/server-language.ts', mocks).getServerLanguage();
}

test('server honours manual cookies, weighted browser preferences and rejected languages', async () => {
  assert.equal(await serverLanguage({ sportmeLanguage: 'HU' }, { 'accept-language': 'pl-PL', 'x-vercel-ip-country': 'RO' }), 'HU');
  assert.equal(await serverLanguage({}, { 'accept-language': 'en-US;q=0.5,sv-SE;q=0.9', 'x-vercel-ip-country': 'RO' }), 'SV');
  assert.equal(await serverLanguage({}, { 'accept-language': 'hu;q=0,tr-TR;q=1' }), 'TR');
  assert.equal(await serverLanguage({ sportmeLanguage: 'INVALID' }, { 'accept-language': 'nb-NO', 'x-vercel-ip-country': 'DK' }), 'NO');
  assert.equal(await serverLanguage({ sportmeVisitorCountry: 'IS' }, { 'accept-language': 'ja-JP' }), 'IS');
});

test('each added language covers public UI, guides, legal text, Romanian FAQ and metadata', () => {
  const oldDocuments = JSON.parse(fs.readFileSync(path.join(root, 'app/app/locales/fr.json'), 'utf8'));
  const publicKeys = Object.keys(JSON.parse(fs.readFileSync(path.join(root, 'app/app/locales/public-pl.json'), 'utf8')));
  const unchanged = new Set(['SportMe Manager', 'SportMe Player', 'Google Analytics', 'WhatsApp']);
  for (const code of newLanguages) {
    const dictionary = JSON.parse(fs.readFileSync(path.join(root, `app/app/locales/${code.toLowerCase()}.json`), 'utf8'));
    const ui = JSON.parse(fs.readFileSync(path.join(root, `app/app/locales/public-${code.toLowerCase()}.json`), 'utf8'));
    for (const key of publicKeys) {
      assert.ok(ui[key]?.trim(), `${code}: missing UI ${key}`);
      assert.equal(translateText(code, key), ui[key]);
    }
    for (const source of ['english', 'romanian']) {
      for (const key of Object.keys(oldDocuments[source])) {
        assert.ok(dictionary[source][key]?.trim(), `${code}: missing ${source} ${key}`);
        assert.equal(translateDocumentText(key, code, source), dictionary[source][key]);
      }
    }
    for (const page of Object.values(siteCopy)) {
      assert.ok(page[code].title && page[code].description);
      assert.notEqual(page[code].description, page.EN.description);
    }
    for (const key of ['Check contact details', 'Google Play subscriptions are being prepared for the Android app. This option will be available after the version that includes it is released.']) {
      assert.notEqual(translateDocumentText(key, code), key, `${code}: untranslated guide`);
    }
    for (const [key, value] of Object.entries(dictionary.english)) {
      if (!unchanged.has(key)) assert.ok(value.length > 0);
      for (const literal of key.match(/https?:\/\/[^\s]+|office@sportme\.ro|\{\w+\}/g) ?? []) {
        assert.ok(value.includes(literal), `${code}: missing literal ${literal}`);
      }
    }
  }
});

test('all 15 languages have flags, and country pricing stays independent of language', () => {
  assert.equal(languages.length, 15);
  for (const language of languages) for (const flag of language.flags) {
    assert.ok(fs.existsSync(path.join(root, `public/flags/${flag}.svg`)));
  }
  const expected = {
    RO: ['12,99', 'RON'], PL: ['12,99', 'PLN'], HU: ['999', 'HUF'], CZ: ['69,99', 'CZK'],
    DK: ['19,99', 'DKK'], SE: ['32,99', 'SEK'], NO: ['29,99', 'NOK'], IS: ['399', 'ISK'],
    CH: ['2,99', 'CHF'], GB: ['2,49', 'GBP'], TR: ['149,99', 'TRY'], DE: ['2,99', 'EUR'],
  };
  for (const [country, [amount, currency]] of Object.entries(expected)) {
    const price = getPublicMonthlyPremiumPrice(country);
    assert.equal(price.amount, amount);
    assert.equal(price.currency, currency);
  }
  assert.equal(detectVisitorLanguage('RO', ['tr-TR']), 'TR');
  assert.equal(getPublicMonthlyPremiumPrice('RO').currency, 'RON');
});
