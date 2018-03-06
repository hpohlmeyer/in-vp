export const createClientRect = sizeAndPosition => ({
  ...sizeAndPosition,
  right: sizeAndPosition.left + sizeAndPosition.width,
  bottom: sizeAndPosition.top + sizeAndPosition.height
});

export const createElementStub = sizeAndPosition => ({
  getBoundingClientRect: () => createClientRect(sizeAndPosition)
});

export const createDocument = size => ({
  documentElement: { clientWidth: size.width, clientHeight: size.height }
});
