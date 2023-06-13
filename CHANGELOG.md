# Changelog

## 1.0.0

- Add basic version
- Add npm index package

## 1.0.1

- Edit readme

## 1.0.2

- Edit readme

## 2.0.0

- Breaking change: move npm module to older cjs format for the sake of simplicity
- Readme edits. Add hyphens mdn link.

## 2.0.1

- Update deps to actual babel presets

## 2.0.4

- Fix paths to correct cjs build

## 3.0.0

- Move to typescript

## 3.1.0

- Add typographic quotes option

## 4.0.0

- Fix XSS vulnerability by using `xss` library for sanitization

## 4.0.1

- Allows `nobr` tag

## 4.0.2

- Fix JS bundling

## 4.1.0

- Allow customizing allowed tags and attributes

## 4.1.1

- Fix deep merging allowed tags and attributes

## 4.1.2

- Fix replacement of double quotes in HTML attributes (e.g. `href="https://github.com"` is no longer removed)

## 5.0.0

- Breaking change: Remove XSS prevention to improve performance and reduce bundle size. Please sanitize the input/output beforehand
- Breaking change: Replace HTML entires with Unicode characters to avoid using `dangerouslySetInnerHTML`

## 5.0.1

- Fix replacement of `&nbsp;` entries
