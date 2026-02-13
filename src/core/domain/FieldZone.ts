export interface FieldZoneProps {
  card: any | null;
  position?: "attack" | "defense" | "face-down";
  canAttack: boolean;
  isInteractable?: boolean;
  isSelected?: boolean;
  isOpponent?: boolean;
  isFocused?: boolean;
  onClick?: () => void;
}

export interface FieldZoneMenuProps {
  mode?: "attack" | "defense" | "face-down";
  index: number;
  onEnd: () => void;
}

export interface ExtendedFieldZoneProps extends FieldZoneProps {
  index: number;
}

export interface ExtendedFieldZoneMenuProps extends FieldZoneMenuProps {
  isOpponent?: boolean;
  canAttack?: boolean;
  card?: any;
}
