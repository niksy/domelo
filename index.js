import trimLeft from 'trim-left';
import trimRight from 'trim-right';
import {
	start as trimNewlinesStart,
	end as trimNewlinesEnd
} from 'trim-newlines';

/**
 * Element returned when converting string to DOM node.
 *
 * @typedef {(HTMLElement|Text)} ElementFromString
 */

const RTAGNAME = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
const NODE_TAG_MATCH = /<\s*\w.*?>/g;

/**
 * @param  {Object} literals
 * @param  {Array} substs
 *
 * @returns {string}
 */
function html(literals, ...substs) {
	const raws = [...literals.raw];
	const rawsLength = raws.length;
	raws[0] = trimLeft(trimNewlinesStart(raws[0]));
	raws[rawsLength - 1] = trimRight(trimNewlinesEnd(raws[rawsLength - 1]));
	return raws.reduce((acc, lit, i) => {
		let subst = substs[i - 1];
		if (Array.isArray(subst)) {
			subst = subst.join('');
		}
		return acc + subst + lit;
	});
}

/**
 * @param  {string} string
 *
 * @returns {ElementFromString}
 */
function createDomElement(string) {
	const wrapMap = {
		option: [1, '<select multiple="multiple">', '</select>'],
		legend: [1, '<fieldset>', '</fieldset>'],
		area: [1, '<map>', '</map>'],
		param: [1, '<object>', '</object>'],
		thead: [1, '<table>', '</table>'],
		tr: [2, '<table><tbody>', '</tbody></table>'],
		col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
		td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
		_default: [0, '', '']
	};

	wrapMap.optgroup = wrapMap.option;
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption =
		wrapMap.thead;
	wrapMap.th = wrapMap.td;

	let element = document.createElement('div');
	const match = NODE_TAG_MATCH.exec(string);
	NODE_TAG_MATCH.lastIndex = 0;

	// If only text is passed
	if (match === null) {
		element.innerHTML = string;
		element = element.lastChild;
		return element;
	}

	const tag = (RTAGNAME.exec(match[0]) || [
		wrapMap._default[1],
		wrapMap._default[2]
	])[1].toLowerCase();
	const wrap = wrapMap[tag] || wrapMap._default;

	element.innerHTML = wrap[1] + string + wrap[2];

	// Descend through wrappers to the right content
	let counter = wrap[0] + 1;
	while (counter--) {
		element = element.lastChild;
		if (
			counter === 0 &&
			element.parentNode &&
			element.parentNode.childNodes.length > 1
		) {
			throw new Error('Only one root element is allowed.');
		}
	}

	return element;
}

/**
 * @param  {Array} templateArguments
 *
 * @returns {ElementFromString}
 */
function template(...templateArguments) {
	const string = html(...templateArguments);
	return createDomElement(string);
}

/**
 * @param  {string} rawString
 *
 * @returns {ElementFromString}
 */
export default (rawString) => {
	const string = trimNewlinesEnd(trimNewlinesStart(rawString)).trim();
	return createDomElement(string);
};

export { template as html };
