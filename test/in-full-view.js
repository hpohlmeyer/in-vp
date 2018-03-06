import test from 'ava';
import { createElementStub, createDocument } from './helpers';
import inVp from '..';

// Mock the browser document
global.document = createDocument({ width: 100, height: 100 });

const elementInVp = createElementStub({
  width: 100,
  height: 100,
  left: 0,
  top: 0
});

test('element inside viewport is fully visible', t => {
  t.true(inVp(elementInVp).fully);
});

test('element inside viewport is not partly visible', t => {
  t.false(inVp(elementInVp).partially);
});

test('element inside viewport has four fully visible edges', t => {
  const edges = inVp(elementInVp).edges;
  t.is(edges.top, 'fully');
  t.is(edges.right, 'fully');
  t.is(edges.bottom, 'fully');
  t.is(edges.left, 'fully');
});
