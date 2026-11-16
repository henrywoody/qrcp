/** True on macOS and iOS, where the copy/paste modifier is ⌘ rather than Ctrl. */
export const isApple = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);

/** The copy/paste modifier key label for this platform. */
export const modifierKey = isApple ? "⌘" : "Ctrl";

/** True when the primary input is a mouse or trackpad (i.e. a laptop/desktop rather than a phone). */
export const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
