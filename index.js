/* globals TemplateStringsArray */
/**
 * @typedef {string[]} Substitutions
 */
/**
 * @typedef {[literals: TemplateStringsArray, ...substitutions: Substitutions]} TemplateArguments
 */

/**
 * @param {TemplateStringsArray} literals
 * @param {Substitutions}        substitutions
 */
function htmlTemplate(literals, ...substitutions) {
	const raws = [...literals.raw];
	const rawsLength = raws.length;
	raws[0] = raws[0];
	raws[rawsLength - 1] = raws[rawsLength - 1];
	return raws.reduce((accumulator, lit, index) => {
		let subst = substitutions[index - 1];
		if (Array.isArray(subst)) {
			subst = subst.join('');
		}
		return accumulator + subst + lit;
	});
}

const createDomElement =
	/**
	 * @type {(
	 *   ((string: string, outputFragment: true) => DocumentFragment) &
	 *   ((string: string, outputFragment?: false) => Element | Text) &
	 *   ((string: string, outputFragment?: boolean) => Element | Text | DocumentFragment)
	 * )}
	 */
	(
		function (string, outputFragment = false) {
			let element = document.createElement('template');

			element.innerHTML = string;
			const output = element.content;

			// If fragment is requested
			if (outputFragment) {
				return output;
			}

			/** @type {Element[]} */
			const childNodes = [].slice.call(output.childNodes);

			/** @type {Element[]} */
			const children = [].slice.call(
				output.children ??
					childNodes.filter((node) => node instanceof Element)
			);

			const lastChild =
				output.lastChild ?? childNodes[childNodes.length - 1] ?? null;

			const firstElementChild =
				output.firstElementChild ?? children[0] ?? null;

			// If only text is passed
			if (children.length === 0 && lastChild instanceof Text) {
				return lastChild;
			}

			if (children.length > 1) {
				throw new Error('Only one root element is allowed.');
			}

			return firstElementChild;
		}
	);

/**
 * Creates `Element` or `Text` from string.
 *
 * @param {TemplateArguments} templateArguments
 */
function html(...templateArguments) {
	const string = htmlTemplate(...templateArguments);
	return createDomElement(string);
}

/**
 * Creates `DocumentFragment` from string.
 *
 * @param {TemplateArguments} templateArguments
 */
function fragment(...templateArguments) {
	const string = htmlTemplate(...templateArguments);
	return createDomElement(string, true);
}

/**
 * Creates DOM element from string. Returns `Node` which can be `Element`, `Text` or `DocumentFragment`.
 *
 * @param {string}  string           HTML string to convert to DOM element.
 * @param {boolean} [outputFragment] Should function return `DocumentFragment` or not. Useful if you want to return multiple elements.
 */
export default function (string, outputFragment) {
	return createDomElement(string, outputFragment);
}

export { html, fragment };
