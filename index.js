/**
 * Element returned when converting string to DOM node.
 *
 * @typedef {(HTMLElement|Text)} ElementFromString
 */

/**
 * @param  {object} literals
 * @param  {Array} substs
 *
 * @returns {string}
 */
function htmlTemplate(literals, ...substs) {
	const raws = [...literals.raw];
	const rawsLength = raws.length;
	raws[0] = raws[0];
	raws[rawsLength - 1] = raws[rawsLength - 1];
	return raws.reduce((accumulator, lit, index) => {
		let subst = substs[index - 1];
		if (Array.isArray(subst)) {
			subst = subst.join('');
		}
		return accumulator + subst + lit;
	});
}

/**
 * @param  {string} string
 * @param  {boolean} outputFragment
 *
 * @returns {ElementFromString}
 * @throws {Error}
 */
function createDomElement(string, outputFragment = false) {
	let element = document.createElement('template');

	element.innerHTML = string;
	const output = element.content;

	// If fragment is requested
	if (outputFragment) {
		return output;
	}

	const childNodes = [].slice.call(output.childNodes);

	const children =
		output.children ?? childNodes.filter((node) => node instanceof Element);
	const lastChild =
		output.lastChild ?? childNodes[childNodes.length - 1] ?? null;
	const firstElementChild = output.firstElementChild ?? children[0] ?? null;

	// If only text is passed
	if (children.length === 0) {
		return lastChild;
	}

	if (children.length > 1) {
		throw new Error('Only one root element is allowed.');
	}

	return firstElementChild;
}

/**
 * @param  {Array} templateArguments
 *
 * @returns {ElementFromString}
 */
function html(...templateArguments) {
	const string = htmlTemplate(...templateArguments);
	return createDomElement(string);
}

/**
 * @param  {Array} templateArguments
 *
 * @returns {ElementFromString}
 */
function fragment(...templateArguments) {
	const string = htmlTemplate(...templateArguments);
	return createDomElement(string, true);
}

/**
 * @param  {string} rawString
 * @param  {boolean} outputFragment
 *
 * @returns {ElementFromString}
 */
export default (rawString, outputFragment) => {
	const string = rawString;
	return createDomElement(string, outputFragment);
};

export { html, fragment };
