export interface GameBoardProps {
  monsterZones: any[];
  isBlur: boolean;
  focusedZoneIndex: number;
  isSelecting?: boolean;
  onZoneSelect?: (index: number) => void;
  highlightedIndex?: number;
  onDraw?: () => void;
}