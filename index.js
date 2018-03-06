'use_strict'

module.exports = (elem, treshold = {}) => {
  treshold = Object.assign({ top: 0, right: 0, bottom: 0, left: 0} , treshold);
  
  // Get the viewport dimensions
  const vp = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  };

  // Get the viewport offset and size of the element.
  // Normailze right and bottom to show offset from their
  // respective edges istead of the top-left edges.
  const box = elem.getBoundingClientRect();
  const { top, left, width, height } = box;
  const right = vp.width - box.right;
  const bottom = vp.height - box.bottom;

  // Calculate which sides of the element are cut-off
  // by the viewport.
  const cutOff = {
    top: top < treshold.top,
    left: left < treshold.left,
    bottom: bottom < treshold.bottom,
    right: right < treshold.right
  };

  // Calculate which sides of the element are partially shown
  const partial = {
    top: cutOff.top && top > -height + treshold.top,
    left: cutOff.left && left > -width + treshold.left,
    bottom: cutOff.bottom && bottom > -height + treshold.bottom,
    right: cutOff.right && right > -width + treshold.right
  };

  const isFullyVisible = top >= treshold.top
                      && right >= treshold.right
                      && bottom >= treshold.bottom
                      && left >= treshold.left;

  const isPartiallyVisible = partial.top
                          || partial.right
                          || partial.bottom
                          || partial.left;

  // Calculate which edge of the element are visible.
  // Every edge can have three states:
  // - 'fully':     The edge is completely visible.
  // - 'partially': Some part of the edge can be seen.
  // - false:       The edge is not visible at all.
  const edges = {
    top: !isFullyVisible && !isPartiallyVisible ? false :
      ((!cutOff.top && !cutOff.left && !cutOff.right) && 'fully')
      || (!cutOff.top && 'partially')
      || false,
    right: !isFullyVisible && !isPartiallyVisible ? false :
        ((!cutOff.right && !cutOff.top && !cutOff.bottom) && 'fully')
        || (!cutOff.right && 'partially')
        || false,
    bottom: !isFullyVisible && !isPartiallyVisible ? false :
         ((!cutOff.bottom && !cutOff.left && !cutOff.right) && 'fully')
         || (!cutOff.bottom && 'partially')
         || false,
    left: !isFullyVisible && !isPartiallyVisible ? false :
       ((!cutOff.left && !cutOff.top && !cutOff.bottom) && 'fully')
       || (!cutOff.left && 'partially')
       || false
  };

  return {
    fully: isFullyVisible, 
    partially: isPartiallyVisible,
    edges
  };
}
