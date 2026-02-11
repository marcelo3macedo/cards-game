export enum ActionKey {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
  Space = "space",
  Enter = "enter",
  F1 = "f1",
  Escape = "Escape",
}

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
  "F1": ActionKey.F1,
  "Escape": ActionKey.Escape
};


const getActionFromKey = (key: string) => KEY_TO_ACTION[key] || null;

export {
    getActionFromKey
}
