export interface FieldZoneProps {
  card: any | null;
  mode?: "atk" | "def" | "face-down";
  isInteractable?: boolean;
  isSelected?: boolean;
  isFocused?: boolean;
  onClick?: () => void;
}

export interface FieldZoneMenuProps {
  mode?: "atk" | "def" | "face-down";
  index: number;
  onInitiateAttack?: (index: number) => void;
  onChangeMode?: (index: number) => void;
  onClose: () => void;
}

export interface ExtendedFieldZoneProps extends FieldZoneProps {
  index: number;
  onInitiateAttack?: (index: number) => void;
  onChangeMode?: (index: number) => void;
}
