interface Size {
  width: number;
  height: number;
}

interface Position {
  top: number;
  left: number;
}

type SizeAndPosition = Size & Position;

export const createClientRect = (sizeAndPosition: SizeAndPosition) => ({
  ...sizeAndPosition,
  right: sizeAndPosition.left + sizeAndPosition.width,
  bottom: sizeAndPosition.top + sizeAndPosition.height
});

export const createElementStub = (sizeAndPosition: SizeAndPosition): HTMLElement => ({
  getBoundingClientRect: () => createClientRect(sizeAndPosition)
} as HTMLElement);

export const createDocument = (size: Size): Document => ({
  documentElement: { clientWidth: size.width, clientHeight: size.height }
} as Document);
