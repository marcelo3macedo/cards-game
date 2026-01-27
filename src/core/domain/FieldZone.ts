export interface FieldZoneProps {
  card: any | null;
  mode?: 'atk' | 'def' | 'face-down';
  isInteractable?: boolean;
  isSelected?: boolean;
  isFocused?: boolean;
  onClick?: () => void;
}