import test from 'ava';
import { createElementStub, createDocument } from './helpers';
import inVp from '../src';

// Mock the browser document
(global as any).document = createDocument({ width: 100, height: 100 });

const elementPartiallyInVp = createElementStub({
  width: 50,
  height: 50,
  left: 25,
  top: 75
});

test('cut-off-element is not fully visible', t => {
  t.false(inVp(elementPartiallyInVp).fully);
});

test('cut-off-element is partially visible', t => {
  t.true(inVp(elementPartiallyInVp).partially);
});

test('cut-off-elements top edge is visible', t => {
  t.is(inVp(elementPartiallyInVp).edges.top, 'fully');
});

test('cut-off-elements side-edges are partially visible', t => {
  t.is(inVp(elementPartiallyInVp).edges.left, 'partially');
  t.is(inVp(elementPartiallyInVp).edges.right, 'partially');
});

test('cut-off-elements bottom-edge is invisible', t => {
  t.is(inVp(elementPartiallyInVp).edges.bottom, false);
});


const elementTooTallForVp = createElementStub({
  width: 50,
  height: 150,
  left: 25,
  top: -25
});

test('too-tall-element is not fully visible', t => {
  t.false(inVp(elementTooTallForVp).fully);
});

test('too-tall-element is partially visible', t => {
  t.true(inVp(elementTooTallForVp).partially);
});

test('too-tall-elements vertical edges are invisible', t => {
  t.is(inVp(elementTooTallForVp).edges.top, false);
  t.is(inVp(elementTooTallForVp).edges.bottom, false);
});

test('too-tall-elements horizontal edges are partially visible', t => {
  t.is(inVp(elementTooTallForVp).edges.left, 'partially');
  t.is(inVp(elementTooTallForVp).edges.right, 'partially');
});


const elementTooLargeForVp = createElementStub({
  width: 200,
  height: 200,
  left: -50,
  top: -50
});

test('too-large-element is not fully visible', t => {
  t.false(inVp(elementTooLargeForVp).fully);
});

test('too-large-element is partially visible', t => {
  t.true(inVp(elementTooLargeForVp).partially);
});

test('too-large-elements edges are invisible', t => {
  t.is(inVp(elementTooLargeForVp).edges.top, false);
  t.is(inVp(elementTooLargeForVp).edges.right, false);
  t.is(inVp(elementTooLargeForVp).edges.bottom, false);
  t.is(inVp(elementTooLargeForVp).edges.left, false);
});
