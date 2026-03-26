# Turborepo monorepo setup
_Exported on 3/25/2026 at 19:55:55 GMT+1 from Cursor (2.3.41)_

---

**User**

I want to move away from my current 'localStorage' language trick and implement a Gold Standard i18n system like Airbnb or Uber using next-intl.
1. The Routing Structure:
Move my current app/ structure into a [locale] dynamic segment (e.g., app/[locale]/layout.tsx).
Implement Middleware to detect the user's preferred language from their browser headers and redirect them to /en, /es, or /ca (Catalan) automatically.
2. Dictionary Strategy:
Create a /messages folder with en.json, es.json, and ca.json.
Move all hardcoded text from my Landing Page and Auth forms into these JSON files.
3. The Toggle Component:
Rewrite the LanguageToggle.tsx to use the usePathname and useRouter hooks from next-intl.
When a user clicks 'ES', it should perform a Client-Side Navigation to the current path but with the new locale prefix.
4. Performance:
Ensure all translations are handled via React Server Components where possible to eliminate the 'Flash of Un-localized Content'.
Use Type-Safe navigation so Cursor can catch missing translation keys during development.

