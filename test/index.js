import assert from 'assert';
import fn, { html } from '../index';

before(function() {
	window.fixture.load('/test/fixtures/index.html');
});

after(function() {
	window.fixture.cleanup();
});

it('should return DOM element when using function', function() {
	/* eslint-disable prettier/prettier */
	const node1 = fn('<div class="becky" data-cali="elvis">gizmo</div>');
	const node2 = fn('<td id="rocky" data-molly="cleo" louie="coco">sassy</td>');
	const node3 = fn('<option value="josie">penny</td>');
	const node4 = fn('<legend id="henry"><span><b>cash</b></span></legend>');
	const node5 = fn('sydney');
	const node6 = () => fn('<div>katie</div><p>athena</p>');
	const node7 = fn(`
		<div class="becky" data-cali="elvis">${'gizmo'}</div>
	`);
	/* eslint-enable */

	const selector1 = 'div.becky[data-cali="elvis"]';
	const content1 = 'gizmo';
	assert.ok(
		node1.matches(selector1),
		`Element doesn’t match selector ${selector1}`
	);
	assert.equal(
		node1.textContent.trim(),
		content1,
		`Element doesn’t have content "${content1}"`
	);

	const selector2 = 'td#rocky[louie="coco"]';
	const content2 = 'sassy';
	assert.ok(
		node2.matches(selector2),
		`Element doesn’t match selector ${selector2}`
	);
	assert.equal(
		node2.textContent.trim(),
		content2,
		`Element doesn’t have content "${content2}"`
	);

	const selector3 = 'option[value="josie"]';
	const content3 = 'penny';
	assert.ok(
		node3.matches(selector3),
		`Element doesn’t match selector ${selector3}`
	);
	assert.equal(
		node3.textContent.trim(),
		content3,
		`Element doesn’t have content "${content3}"`
	);

	const selector4 = 'legend#henry';
	const content4 = '<span><b>cash</b></span>';
	assert.ok(
		node4.matches(selector4),
		`Element doesn’t match selector ${selector4}`
	);
	assert.equal(
		node4.innerHTML.trim(),
		content4,
		`Element doesn’t have HTML "${content4}"`
	);

	const content5 = 'sydney';
	assert.ok(node5.nodeType === Node.TEXT_NODE, 'Element is not text node');
	assert.equal(
		node5.textContent.trim(),
		content5,
		`Element doesn’t have content "${content5}"`
	);

	assert.throws(() => node6(), /Only one root element is allowed/);

	const selector7 = 'div.becky[data-cali="elvis"]';
	const content7 = 'gizmo';
	assert.ok(
		node7.matches(selector7),
		`Element doesn’t match selector ${selector7}`
	);
	assert.equal(
		node7.textContent.trim(),
		content7,
		`Element doesn’t have content "${content7}"`
	);

	node1.remove();
	node2.remove();
	node3.remove();
	node4.remove();
	node5.remove();
	node7.remove();
});

it('should return DOM element when using tagged templates', function() {
	/* eslint-disable prettier/prettier */
	const node1 = html`<div class="becky" data-cali="elvis">gizmo</div>`;
	const node2 = html`<td id="rocky" data-molly="cleo" louie="coco">sassy</td>`;
	const node3 = html`<option value="josie">penny</td>`;
	const node4 = html`<legend id="henry"><span><b>cash</b></span></legend>`;
	const node5 = html`sydney`;
	const node6 = () => html`<div>katie</div><p>athena</p>`;
	const node7 = html`
		<div class="becky" data-cali="elvis">${'gizmo'}</div>
	`;
	/* eslint-enable */

	const selector1 = 'div.becky[data-cali="elvis"]';
	const content1 = 'gizmo';
	assert.ok(
		node1.matches(selector1),
		`Element doesn’t match selector ${selector1}`
	);
	assert.equal(
		node1.textContent.trim(),
		content1,
		`Element doesn’t have content "${content1}"`
	);

	const selector2 = 'td#rocky[louie="coco"]';
	const content2 = 'sassy';
	assert.ok(
		node2.matches(selector2),
		`Element doesn’t match selector ${selector2}`
	);
	assert.equal(
		node2.textContent.trim(),
		content2,
		`Element doesn’t have content "${content2}"`
	);

	const selector3 = 'option[value="josie"]';
	const content3 = 'penny';
	assert.ok(
		node3.matches(selector3),
		`Element doesn’t match selector ${selector3}`
	);
	assert.equal(
		node3.textContent.trim(),
		content3,
		`Element doesn’t have content "${content3}"`
	);

	const selector4 = 'legend#henry';
	const content4 = '<span><b>cash</b></span>';
	assert.ok(
		node4.matches(selector4),
		`Element doesn’t match selector ${selector4}`
	);
	assert.equal(
		node4.innerHTML.trim(),
		content4,
		`Element doesn’t have HTML "${content4}"`
	);

	const content5 = 'sydney';
	assert.ok(node5.nodeType === Node.TEXT_NODE, 'Element is not text node');
	assert.equal(
		node5.textContent.trim(),
		content5,
		`Element doesn’t have content "${content5}"`
	);

	assert.throws(() => node6(), /Only one root element is allowed/);

	const selector7 = 'div.becky[data-cali="elvis"]';
	const content7 = 'gizmo';
	assert.ok(
		node7.matches(selector7),
		`Element doesn’t match selector ${selector7}`
	);
	assert.equal(
		node7.textContent.trim(),
		content7,
		`Element doesn’t have content "${content7}"`
	);

	node1.remove();
	node2.remove();
	node3.remove();
	node4.remove();
	node5.remove();
	node7.remove();
});
