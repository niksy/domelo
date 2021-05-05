# domelo

[![Build Status][ci-img]][ci]
[![BrowserStack Status][browserstack-img]][browserstack]

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

Returns: `(HTMLElement|Text|DocumentFragment)`

Creates DOM element from string. Returns `Node` which can be `HTMLElement`,
`Text` or `DocumentFragment`.

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

-   For `HTMLElement` return `outerHTML` property value
-   For `Text` return `wholeText` property value
-   Arrays should be joined at least with empty string
-   Fragments can be handled referencing `children` or `childNodes` property and
    should be joined at least with empty string

## Browser support

Tested in Edge 15, Chrome 72 and Firefox 65, and should work in all modern
browsers
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
[browserstack-img]: https://www.browserstack.com/automate/badge.svg?badge_key=N0FQVzZDK2JpVW5tRmVzVG9wMmJIR2NjejhPNkNCTk9BSTZIZlpXQ212WT0tLVpvZFlZa0ppWGh4cHNFZm9RR0Z2NVE9PQ==--9705cb64b3cf20a746a007a73c341eccb90a81ea

<!-- prettier-ignore-end -->
