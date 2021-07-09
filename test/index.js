import assert from 'assert';
import function_, { html, fragment } from '../index';

before(function () {
	window.fixture.load('/test/fixtures/index.html');
});

after(function () {
	window.fixture.cleanup();
});

it('should return DOM element', function () {
	/* eslint-disable prettier/prettier */
	const functionNode = function_('<div class="becky" data-cali="elvis">gizmo</div>');
	const templateNode = html`<div class="becky" data-cali="elvis">gizmo</div>`;
	/* eslint-enable */

	const selector = 'div.becky[data-cali="elvis"]';
	const content = 'gizmo';

	assert.ok(
		functionNode instanceof HTMLDivElement,
		'Not an instance of HTMLDivElement'
	);
	assert.ok(
		templateNode instanceof HTMLDivElement,
		'Not an instance of HTMLDivElement'
	);

	assert.ok(
		functionNode.matches(selector),
		`Element doesn’t match selector ${selector}`
	);
	assert.equal(
		functionNode.textContent?.trim(),
		content,
		`Element doesn’t have content "${content}"`
	);

	assert.ok(
		templateNode.matches(selector),
		`Element doesn’t match selector ${selector}`
	);
	assert.equal(
		templateNode.textContent?.trim(),
		content,
		`Element doesn’t have content "${content}"`
	);

	functionNode.remove();
	templateNode.remove();
});

it('should return table cell element', function () {
	/* eslint-disable prettier/prettier */
	const functionNode = function_('<td id="rocky" data-molly="cleo" louie="coco">sassy</td>');
	const templateNode = html`<td id="rocky" data-molly="cleo" louie="coco">sassy</td>`;
	/* eslint-enable */

	const selector = 'td#rocky[louie="coco"]';
	const content = 'sassy';

	assert.ok(
		functionNode instanceof HTMLTableCellElement,
		'Not an instance of HTMLTableCellElement'
	);
	assert.ok(
		templateNode instanceof HTMLTableCellElement,
		'Not an instance of HTMLTableCellElement'
	);

	assert.ok(
		functionNode.matches(selector),
		`Element doesn’t match selector ${selector}`
	);
	assert.equal(
		functionNode.textContent?.trim(),
		content,
		`Element doesn’t have content "${content}"`
	);

	assert.ok(
		templateNode.matches(selector),
		`Element doesn’t match selector ${selector}`
	);
	assert.equal(
		templateNode.textContent?.trim(),
		content,
		`Element doesn’t have content "${content}"`
	);

	functionNode.remove();
	templateNode.remove();
});

it('should return option element', function () {
	/* eslint-disable prettier/prettier */
	const functionNode = function_('<option value="josie">penny</option>');
	const templateNode = html`<option value="josie">penny</option>`;
	/* eslint-enable */

	const selector = 'option[value="josie"]';
	const content = 'penny';

	assert.ok(
		functionNode instanceof HTMLOptionElement,
		'Not an instance of HTMLOptionElement'
	);
	assert.ok(
		templateNode instanceof HTMLOptionElement,
		'Not an instance of HTMLOptionElement'
	);

	assert.ok(
		functionNode.matches(selector),
		`Element doesn’t match selector ${selector}`
	);
	assert.equal(
		functionNode.textContent?.trim(),
		content,
		`Element doesn’t have content "${content}"`
	);

	assert.ok(
		templateNode.matches(selector),
		`Element doesn’t match selector ${selector}`
	);
	assert.equal(
		templateNode.textContent?.trim(),
		content,
		`Element doesn’t have content "${content}"`
	);

	functionNode.remove();
	templateNode.remove();
});

it('should return DOM element with multiple children DOM elements', function () {
	/* eslint-disable prettier/prettier */
	const functionNode = function_('<legend id="henry"><span><b>cash</b></span></legend>');
	const templateNode = html`<legend id="henry"><span><b>cash</b></span></legend>`;
	/* eslint-enable */

	const selector = 'legend#henry';
	const content = '<span><b>cash</b></span>';

	assert.ok(
		functionNode instanceof HTMLLegendElement,
		'Not an instance of HTMLLegendElement'
	);
	assert.ok(
		templateNode instanceof HTMLLegendElement,
		'Not an instance of HTMLLegendElement'
	);

	assert.ok(
		functionNode.matches(selector),
		`Element doesn’t match selector ${selector}`
	);
	assert.equal(
		functionNode.innerHTML.trim(),
		content,
		`Element doesn’t have HTML "${content}"`
	);

	assert.ok(
		templateNode.matches(selector),
		`Element doesn’t match selector ${selector}`
	);
	assert.equal(
		templateNode.innerHTML.trim(),
		content,
		`Element doesn’t have HTML "${content}"`
	);

	functionNode.remove();
	templateNode.remove();
});

it('should return text content as root node', function () {
	/* eslint-disable prettier/prettier */
	const functionNode = function_('sydney');
	const templateNode = html`sydney`;
	/* eslint-enable */

	const content = 'sydney';

	assert.ok(functionNode instanceof Text, 'Not an instance of Text');
	assert.ok(templateNode instanceof Text, 'Not an instance of Text');

	assert.ok(
		functionNode.nodeType === Node.TEXT_NODE,
		'Element is not text node'
	);
	assert.equal(
		functionNode.textContent?.trim(),
		content,
		`Element doesn’t have content "${content}"`
	);

	assert.ok(
		templateNode.nodeType === Node.TEXT_NODE,
		'Element is not text node'
	);
	assert.equal(
		templateNode.textContent?.trim(),
		content,
		`Element doesn’t have content "${content}"`
	);

	functionNode.remove();
	templateNode.remove();
});

it('should throw if multiple root elements are provided', function () {
	/* eslint-disable prettier/prettier */
	const functionNode = () => function_('<div>katie</div><p>athena</p>');
	const templateNode = () => html`<div>katie</div><p>athena</p>`;
	/* eslint-enable */

	assert.throws(() => functionNode(), /Only one root element is allowed/);
	assert.throws(() => templateNode(), /Only one root element is allowed/);
});

it('should return DOM element when using spaces at start and end', function () {
	/* eslint-disable prettier/prettier */
	const functionNode = function_(`
		<div class="becky" data-cali="elvis">${'gizmo'}</div>
	`);
	const templateNode = html`
		<div class="becky" data-cali="elvis">${'gizmo'}</div>
	`;
	/* eslint-enable */

	const selector = 'div.becky[data-cali="elvis"]';
	const content = 'gizmo';

	assert.ok(
		functionNode instanceof HTMLDivElement,
		'Not an instance of HTMLDivElement'
	);
	assert.ok(
		templateNode instanceof HTMLDivElement,
		'Not an instance of HTMLDivElement'
	);

	assert.ok(
		functionNode.matches(selector),
		`Element doesn’t match selector ${selector}`
	);
	assert.equal(
		functionNode.textContent?.trim(),
		content,
		`Element doesn’t have content "${content}"`
	);

	assert.ok(
		templateNode.matches(selector),
		`Element doesn’t match selector ${selector}`
	);
	assert.equal(
		templateNode.textContent?.trim(),
		content,
		`Element doesn’t have content "${content}"`
	);

	functionNode.remove();
	templateNode.remove();
});

it('should return fragment if requested', function () {
	/* eslint-disable prettier/prettier */
	const functionNode = function_(`
		<div class="becky" data-cali="elvis">${'gizmo'}</div>
		<div class="baxter" data-chico="archie">${'otis'}</div>
	`, true);
	const templateNode = fragment`
		<div class="becky" data-cali="elvis">${'gizmo'}</div>
		<div class="baxter" data-chico="archie">${'otis'}</div>
	`;
	/* eslint-enable */

	const selector = 'div.baxter[data-chico="archie"]';
	const content = 'otis';

	assert.ok(
		functionNode instanceof DocumentFragment,
		'Not an instance of DocumentFragment'
	);
	assert.ok(
		templateNode instanceof DocumentFragment,
		'Not an instance of DocumentFragment'
	);

	/** @type {Element[]} */
	const functionNodeChildNodes = [].slice.call(functionNode.childNodes);

	/** @type {Element[]} */
	const templateNodeChildNodes = [].slice.call(templateNode.childNodes);

	/** @type {Element[]} */
	const functionNodeChildren = [].slice.call(
		functionNode.children ??
			functionNodeChildNodes.filter((node) => node instanceof Element)
	);

	/** @type {Element[]} */
	const templateNodeChildren = [].slice.call(
		templateNode.children ??
			templateNodeChildNodes.filter((node) => node instanceof Element)
	);

	assert.ok(
		functionNodeChildren[1].matches(selector),
		`Last element doesn’t match selector ${selector}`
	);
	assert.equal(
		functionNodeChildren[1].textContent?.trim(),
		content,
		`Last element doesn’t have content "${content}"`
	);

	assert.ok(
		templateNodeChildren[1].matches(selector),
		`Last element doesn’t match selector ${selector}`
	);
	assert.equal(
		templateNodeChildren[1].textContent?.trim(),
		content,
		`Last element doesn’t have content "${content}"`
	);

	functionNodeChildren.forEach((element) => {
		element.remove();
	});
	templateNodeChildren.forEach((element) => {
		element.remove();
	});
});
