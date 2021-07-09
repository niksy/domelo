# domelo

[![Build Status][ci-img]][ci]
[![Browser testing by BrowserStack][browserstack-img]][browserstack]

Create DOM element from string.

Features:

-   Function or tagged template literal implementation
-   Handles elements which need specific parent element (e.g. `td` needs `table`
    element)
-   Returns `DocumentFragment` with multiple elements if requested

## Install

```sh
npm install domelo --save
```

## Usage

```js
import domelo, { html, fragment } from 'domelo';

const div = domelo('<div id="becky" data-rocco="sammy">zoe</div>'); // Returns div element
const span = html`<p id="harley"><b class="misty">chester</b></p>`; // Returns p element
const list = fragment`<li id="gus"><b class="walter">charlie</b></li><li id="blue"><b class="sydney">teddy</b></li>`; // Returns fragment with 2 list elements
```

Tagged template implementation is here so you can easily make
[your](https://github.com/sublimehq/Packages/issues/179)
[code](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html)
[editor](https://github.com/atom/language-javascript/pull/282) syntax higlight
strings inside `html` template function as HTML markup.

Fragment tagged template function is used to return `DocumentFragment`, which is
useful if you want to return multiple elements.

## API

### domelo(string, outputFragment)

Returns: `(Element|Text|DocumentFragment)`

Creates DOM element from string. Returns `Node` which can be `Element`, `Text`
or `DocumentFragment`.

#### string

Type: `string`

HTML string to convert to DOM element.

#### outputFragment

Type: `boolean`  
Default: `false`

Should function return `DocumentFragment` or not. Useful if you want to return
multiple elements.

## FAQ

### How are non-textual interpolations handled?

You need to explictly return string-like value to get proper content shown:

-   For `Element` return `outerHTML` property value
-   For `Text` return `wholeText` property value
-   Arrays should be joined at least with empty string
-   Fragments can be handled referencing `children` or `childNodes` property and
    should be joined at least with empty string

## Browser support

Tested in Chrome 72, Edge 15, Firefox 65 and should work in all modern browsers
([support based on Browserslist configuration](https://browserslist.dev/?q=bGFzdCAzIG1ham9yIHZlcnNpb25zLCBzaW5jZSAyMDE5LCBlZGdlID49IDE1LCBub3QgaWUgPiAw)).

## Test

For automated tests, run `npm run test:automated` (append `:watch` for watcher
support).

## Acknowledgments

-   [How to properly convert HTML string to a DOM element](http://krasimirtsonev.com/blog/article/Revealing-the-magic-how-to-properly-convert-HTML-string-to-a-DOM-element)
-   [jQuery wrapping implementation](https://github.com/jquery/jquery/blob/e743cbd28553267f955f71ea7248377915613fd9/src/manipulation/buildFragment.js#L40-L62)
-   [HTML templating with ES6 template strings](http://2ality.com/2015/01/template-strings-html.html)

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

<!-- prettier-ignore-start -->

[ci]: https://travis-ci.com/niksy/domelo
[ci-img]: https://travis-ci.com/niksy/domelo.svg?branch=master
[browserstack]: https://www.browserstack.com/
[browserstack-img]: https://img.shields.io/badge/browser%20testing-BrowserStack-informational?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiAgPGRlZnMvPgogIDxyYWRpYWxHcmFkaWVudCBpZD0iYSIgY3g9IjIwLjk0Mjk3NiIgY3k9IjI4LjA5NDY3ODczIiByPSIzLjc5MTM0MTQxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM3OTc5NzkiLz4KICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzRjNGM0YyIvPgogIDwvcmFkaWFsR3JhZGllbnQ+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI5LjcyOTIwNCAtNTcuMTg3NjExKSBzY2FsZSgyLjk3MjkyKSI+CiAgICA8Y2lyY2xlIGN4PSIyMC43ODkiIGN5PSIzMC4wMjUiIHI9IjEwLjczOSIgZmlsbD0iI2Y0Yjk2MCIvPgogICAgPGNpcmNsZSBjeD0iMTkuNyIgY3k9IjI4LjkzNiIgcj0iOS43IiBmaWxsPSIjZTY2ZjMyIi8+CiAgICA8Y2lyY2xlIGN4PSIyMS4wMzYiIGN5PSIyNy42OTkiIHI9IjguNDEzIiBmaWxsPSIjZTQzYzQxIi8+CiAgICA8Y2lyY2xlIGN4PSIyMS42NzkiIGN5PSIyOC4zNDIiIHI9IjcuNzIiIGZpbGw9IiNiZGQwNDEiLz4KICAgIDxjaXJjbGUgY3g9IjIxLjEzNSIgY3k9IjI4LjkzNiIgcj0iNy4xNzYiIGZpbGw9IiM2ZGI1NGMiLz4KICAgIDxjaXJjbGUgY3g9IjE5Ljk5NyIgY3k9IjI3Ljc0OCIgcj0iNS45ODgiIGZpbGw9IiNhZWRhZTYiLz4KICAgIDxjaXJjbGUgY3g9IjIwLjkzNyIgY3k9IjI2Ljc1OCIgcj0iNS4wNDgiIGZpbGw9IiM1NmI4ZGUiLz4KICAgIDxjaXJjbGUgY3g9IjIxLjU4IiBjeT0iMjcuNDUxIiByPSI0LjQwNSIgZmlsbD0iIzAwYjFkNSIvPgogICAgPGNpcmNsZSBjeD0iMjAuOTM3IiBjeT0iMjguMDQ1IiByPSIzLjc2MSIgZmlsbD0idXJsKCNhKSIvPgogICAgPGNpcmNsZSBjeD0iMjAuOTM3IiBjeT0iMjguMDQ1IiByPSIzLjc2MSIgZmlsbD0iIzIyMWYxZiIvPgogICAgPGVsbGlwc2UgY3g9Ii0xNS4xNTkiIGN5PSIzMS40MDEiIGZpbGw9IiNmZmYiIHJ4PSIxLjE4OCIgcnk9Ii43NDIiIHRyYW5zZm9ybT0icm90YXRlKC02NS44MzQpIi8+CiAgPC9nPgo8L3N2Zz4K

<!-- prettier-ignore-end -->
