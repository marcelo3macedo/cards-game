export interface FieldZoneProps {
  card: any | null;
  mode?: "atk" | "def" | "face-down";
  isInteractable?: boolean;
  isSelected?: boolean;
  isOpponent?: boolean;
  isFocused?: boolean;
  onClick?: () => void;
}

export interface FieldZoneMenuProps {
  mode?: "atk" | "def" | "face-down";
  index: number;
  onEnd: () => void;
}

export interface ExtendedFieldZoneProps extends FieldZoneProps {
  index: number;
}

export interface ExtendedFieldZoneMenuProps extends FieldZoneMenuProps {
  isOpponent?: boolean;
  card?: any;
}
