# SportMe public site

Public presentation site for `sportme.ro` and `www.sportme.ro`.

The user application lives in the separate Vercel project behind `app.sportme.ro`.
The manager application lives in the separate Vercel project behind `admin.sportme.ro`.

## Public-site languages

The site supports RO, EN, FR, DE, IT, ES, PT, PL, HU, CS, DA, SV, NO (Bokmal), IS and TR.
Manual selection is remembered in the `sportmeLanguage` cookie and `appLanguage` localStorage entry.
Without a saved selection, the server uses the supported `Accept-Language` preferences in quality order,
then the visitor country, then English. Browser detection also recognises Norwegian `nb` and `nn` tags.
Automatic detection does not save a manual preference. Country-based prices are independent of language.

The additional languages use `app/app/locales/public-*.json` for shared UI and the matching
document dictionaries for Quick Start, legal pages and FAQ/SEO content. Their galleries use
the same image selection as EN; existing source images are not translated or replaced.

Run `node --test tests/localization.test.cjs` to check language selection, translation coverage,
metadata, flags and country pricing. Run `npm run build` before publishing.
