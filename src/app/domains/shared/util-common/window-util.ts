export function isElementOverlyingCursor(element: Element, $event: MouseEvent) {
  const bottomSheetY = window.innerHeight - element?.getBoundingClientRect()?.height || 0;
  const eventY = $event?.y || 0;

  return bottomSheetY < (eventY + 10); // inaccuracy correction
}
