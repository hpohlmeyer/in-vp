export interface InVpThreshold {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface InVpEdgeVisibility {
  top?: 'fully' | 'partially' | false;
  right?: 'fully' | 'partially' | false;
  bottom?: 'fully' | 'partially' | false;
  left?: 'fully' | 'partially' | false;
}

export interface InVpVisibilityResult {
  fully: boolean;
  partially: boolean;
  edges: Required<InVpEdgeVisibility>;
}

export default (elem: HTMLElement, threshold: InVpThreshold = {}): InVpVisibilityResult => {
  const _threshold = { top: 0, right: 0, bottom: 0, left: 0, ...threshold };

  // Get the viewport dimensions
  const vp = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  };

  // Get the viewport offset and size of the element.
  // Normalize right and bottom to show offset from their
  // respective edges instead of the top-left edges.
  const box = elem.getBoundingClientRect();
  const { top, left, width, height } = box;
  const right = vp.width - box.right;
  const bottom = vp.height - box.bottom;

  // Calculate which sides of the element are cut-off
  // by the viewport.
  const cutOff = {
    top: top < _threshold.top,
    left: left < _threshold.left,
    bottom: bottom < _threshold.bottom,
    right: right < _threshold.right,
  };

  // Calculate which sides of the element are partially shown
  const partial = {
    top: cutOff.top && top > -height + _threshold.top,
    left: cutOff.left && left > -width + _threshold.left,
    bottom: cutOff.bottom && bottom > -height + _threshold.bottom,
    right: cutOff.right && right > -width + _threshold.right,
  };

  const isFullyVisible: boolean =
    top >= _threshold.top &&
    right >= _threshold.right &&
    bottom >= _threshold.bottom &&
    left >= _threshold.left;

  const isPartiallyVisible: boolean =
    partial.top || partial.right || partial.bottom || partial.left;

  // Calculate which edge of the element are visible.
  // Every edge can have three states:
  // - 'fully':     The edge is completely visible.
  // - 'partially': Some part of the edge can be seen.
  // - false:       The edge is not visible at all.
  const edges: Required<InVpEdgeVisibility> = {
    top:
      !isFullyVisible && !isPartiallyVisible
        ? false
        : (!cutOff.top && !cutOff.left && !cutOff.right && 'fully') ||
          (!cutOff.top && 'partially') ||
          false,
    right:
      !isFullyVisible && !isPartiallyVisible
        ? false
        : (!cutOff.right && !cutOff.top && !cutOff.bottom && 'fully') ||
          (!cutOff.right && 'partially') ||
          false,
    bottom:
      !isFullyVisible && !isPartiallyVisible
        ? false
        : (!cutOff.bottom && !cutOff.left && !cutOff.right && 'fully') ||
          (!cutOff.bottom && 'partially') ||
          false,
    left:
      !isFullyVisible && !isPartiallyVisible
        ? false
        : (!cutOff.left && !cutOff.top && !cutOff.bottom && 'fully') ||
          (!cutOff.left && 'partially') ||
          false,
  };

  return {
    fully: isFullyVisible,
    partially: isPartiallyVisible,
    edges,
  };
};
