# domelo

[![Build Status][ci-img]][ci]
[![BrowserStack Status][browserstack-img]][browserstack]

Create DOM element from string.

Features:

-   Function or tagged template literal implementation
-   Handles elements which need specific parent element (e.g. `td` needs `table`
    element)

## Install

```sh
npm install domelo --save
```

## Usage

```js
import domelo, { html } from 'domelo';

const div = domelo('<div id="becky" data-rocco="sammy">zoe</div>'); // Returns div element
const span = html`
	<p id="harley"><b class="misty">chester</b></p>
`; // Returns p element
```

Tagged template implementation is here so you can easily make
[your](https://github.com/sublimehq/Packages/issues/179)
[code](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html)
[editor](https://github.com/atom/language-javascript/pull/282) syntax higlight
strings inside `html` template function as HTML markup.

## API

### domelo(string)

Returns: `(HTMLElement|Text)`

Creates DOM element from string. Returns `Node` which can be `HTMLElement` or
`Text`.

#### string

Type: `string`

HTML string to convert to DOM element. Whitespace and newlines are trimmed from
start and end of HTML string.

## FAQ

### How are non-textual interpolations handled?

You need to explictly return string-like value to get proper content shown:

* For `HTMLElement` return `outerHTML` property value
* For `Text` return `wholeText` property value
* Arrays should be joined at least with empty string

## Browser support

Tested in IE9+ and all modern browsers, assuming
[tagged templates are transpiled](https://babeljs.io/docs/en/babel-plugin-transform-template-literals).

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
[browserstack-img]: https://www.browserstack.com/automate/badge.svg?badge_key=SHQxMmdTOXlCMk9RakpBNVZJbG1QS1lDMFIyVnd0Rk1yUW10NGh4Tjk0bz0tLXJZYkpnZXJtcDI2RlBsK1VIL2JFZEE9PQ==--3f7b9dc5dc910301116ca982eeab24276cbc7d94

<!-- prettier-ignore-end -->
