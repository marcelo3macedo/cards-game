export const ActionKey = {
  Up: "up",
  Down: "down",
  Left: "left",
  Right: "right",
  Space: "space",
  Enter: "enter",
  Info: "info",
  F1: "f1",
  Escape: "Escape",
  Fusion: "fusion",
} as const;

export type ActionKey = (typeof ActionKey)[keyof typeof ActionKey];

const KEY_TO_ACTION: Record<string, ActionKey> = {
  "w": ActionKey.Up,
  "ArrowUp": ActionKey.Up,
  "s": ActionKey.Down,
  "ArrowDown": ActionKey.Down,
  "a": ActionKey.Left,
  "ArrowLeft": ActionKey.Left,
  "d": ActionKey.Right,
  "ArrowRight": ActionKey.Right,
  " ": ActionKey.Space,
  "Enter": ActionKey.Enter,
  "i": ActionKey.Info,
  "F1": ActionKey.F1,
  "Escape": ActionKey.Escape,
  "f": ActionKey.Fusion,
};


const getActionFromKey = (key: string) => KEY_TO_ACTION[key] || null;

export {
    getActionFromKey
}
