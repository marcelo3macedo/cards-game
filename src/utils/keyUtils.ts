// utils/keyboard.ts

export const ActionKey = {
  Up: "up",
  Down: "down",
  Left: "left",
  Right: "right",
  Space: "space",
  Enter: "enter",
  Info: "info",
  F1: "f1",
  Escape: "escape",
  Fusion: "fusion",
} as const;

export type ActionKey = (typeof ActionKey)[keyof typeof ActionKey];

const KEY_TO_ACTION: Record<string, ActionKey> = {
  // movimento
  arrowup: ActionKey.Up,
  w: ActionKey.Up,

  arrowdown: ActionKey.Down,
  s: ActionKey.Down,

  arrowleft: ActionKey.Left,
  a: ActionKey.Left,

  arrowright: ActionKey.Right,
  d: ActionKey.Right,

  // ações
  " ": ActionKey.Space,
  space: ActionKey.Space,

  enter: ActionKey.Enter,

  i: ActionKey.Info,
  f1: ActionKey.F1,

  escape: ActionKey.Escape,
  backspace: ActionKey.Escape,

  f: ActionKey.Fusion,
};

export const getActionFromKey = (key: string): ActionKey | null => {
  return KEY_TO_ACTION[key.toLowerCase()] ?? null;
};
