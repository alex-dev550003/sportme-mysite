// No network calls. Check every rendered translation key and long-form copy.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
function source(file) { return fs.readFileSync(path.join(root, file), 'utf8'); }
function evaluate(code) {
  const exports = {};
  new Function('exports', ts.transpile(code, { module: ts.ModuleKind.CommonJS }))(exports);
  return exports;
}
function initializer(file, name) {
  const tree = ts.createSourceFile(file, source(file), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let value;
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(tree) === name) value = node.initializer;
    ts.forEachChild(node, visit);
  }
  visit(tree);
  assert(value, `Missing ${name} in ${file}`);
  return evaluate('exports.value = ' + value.getText(tree)).value;
}
const base = evaluate(source('app/app/translations.ts'));
const messages = initializer('app/app/public-locales.ts', 'messages');
const documents = ['fr', 'de', 'it', 'es', 'pt'].map(code => JSON.parse(source(`app/app/locales/${code}.json`)));
for (const [key, row] of Object.entries(messages)) {
  assert.equal(row.length, 5, key);
  assert(row.every(value => typeof value === 'string' && value.trim()), key);
  const params = key.match(/\{\w+\}/g) || [];
  row.forEach(value => params.forEach(param => assert(value.includes(param), `${key}: missing ${param}`)));
}
const identities = new Set(['appLanguage', 'localStorage', 'SportMe Booking SRL', 'sportme_public_cookie_consent', '_ga', 'cookie', 'Google Analytics', '_ga_RLVDZPWDJL', 'SPORTME MANAGER']);
let count = 0;
const missing = new Set();
function check(text, longForm = false) {
  if (!text || identities.has(text) || /^https?:|^mailto:|^\/|^#|\.png$|\.jpg$/.test(text) || /^[\w.-]+@\S+$/.test(text)) return;
  if (messages[text]) { count++; return; }
  if (!(longForm && documents.every(doc => doc.english[text]))) missing.add(text);
  count++;
}
function collect(value, callback, key = '') {
  if (['href', 'src', 'image', 'imageSrc', 'canonical'].includes(key)) return;
  if (typeof value === 'string') callback(value);
  else if (Array.isArray(value)) value.forEach(item => collect(item, callback));
  else if (value && typeof value === 'object') Object.entries(value).forEach(([key, item]) => collect(item, callback, key));
}
function walk(dir) {
  for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    const file = `${dir}/${entry.name}`;
    if (entry.isDirectory()) walk(file);
    else if (file.endsWith('.tsx')) {
      const tree = ts.createSourceFile(file, source(file), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
      function visit(node) {
        if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) {
          if (node.expression.text === 't') check(base.translations.EN[node.arguments[0].text]);
          if (node.expression.text === 'text') check(node.arguments[0].text);
        }
        ts.forEachChild(node, visit);
      }
      visit(tree);
    }
  }
}
walk('app');
for (const policy of ['privacyPolicy', 'termsPolicy', 'cookiesPolicy']) collect(base[policy].EN, text => check(text, true));
collect(initializer('app/manager/quick-start/QuickStartContent.tsx', 'copy').EN, text => check(text, true));
const showcases = initializer('app/components/home/AppShowcase.tsx', 'showcase');
for (const item of Object.values(showcases)) {
  for (const field of ['eyebrow', 'title', 'subtitle', 'cta']) collect(item[field].EN, text => check(text));
  item.slides.forEach(slide => check(slide.label));
}
const expected = Object.keys(documents[0].romanian).sort();
for (const doc of [...documents, JSON.parse(source('app/app/locales/en.json'))]) {
  assert.deepEqual(Object.keys(doc.romanian).sort(), expected);
  assert(Object.values(doc.romanian).every(Boolean));
}
const languageDefinitions = initializer('app/app/languages.ts', 'languages');
assert.equal(languageDefinitions.length, 7);
for (const lang of languageDefinitions) for (const flag of lang.flags) assert(fs.existsSync(path.join(root, 'public/flags', flag + '.svg')));
assert.equal(missing.size, 0, `Missing translations:\n${[...missing].join('\n')}`);
console.log(`Verified ${count} rendered text occurrences, seven locales, document dictionaries and flag assets.`);
