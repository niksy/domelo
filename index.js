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
function html(literals, ...substs) {
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
 *
 * @returns {ElementFromString}
 * @throws {Error}
 */
function createDomElement(string) {
	let element = document.createElement('template');

	element.innerHTML = string;
	const output = element.content;

	// If only text is passed
	if (output.children.length === 0) {
		return output.lastChild;
	}

	if (output.children.length > 1) {
		throw new Error('Only one root element is allowed.');
	}

	return output.firstElementChild;
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
	const string = rawString;
	return createDomElement(string);
};

export { template as html };
