import test from 'ava';
import { createElementStub, createDocument } from './helpers';
import inVp from '../src';

// Mock the browser document
(global as any).document = createDocument({ width: 100, height: 100 });

const elementOutsideVp = createElementStub({
  width: 50,
  height: 50,
  left: 50,
  top: 100
});

test('element outside of viewport is not fully visible', t => {
  t.false(inVp(elementOutsideVp).fully);
});

test('element outside of viewport is not partially visible', t => {
  t.false(inVp(elementOutsideVp).partially);
});

test('element outside of viewport has no visible edges', t => {
  t.false(inVp(elementOutsideVp).edges.top);
  t.false(inVp(elementOutsideVp).edges.right);
  t.false(inVp(elementOutsideVp).edges.bottom);
  t.false(inVp(elementOutsideVp).edges.left);
});

const elementTooBigForVp = createElementStub({
  width: 102,
  height: 102,
  left: -1,
  top: -1
});

test('element too big for the viewport is not fully visible', t => {
  t.false(inVp(elementTooBigForVp).fully);
});

test('element too big for the viewport is partially visible', t => {
  t.true(inVp(elementTooBigForVp).partially);
});

test('element too big for the viewport has no visible edges', t => {
  t.false(inVp(elementTooBigForVp).edges.top);
  t.false(inVp(elementTooBigForVp).edges.right);
  t.false(inVp(elementTooBigForVp).edges.bottom);
  t.false(inVp(elementTooBigForVp).edges.left);
});