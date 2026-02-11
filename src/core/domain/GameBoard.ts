export interface GameBoardProps {
  monsterZones: any[];
  isBlur: boolean;
  focusedZoneIndex: number;
  isSelecting?: boolean;
  onZoneSelect?: (index: number) => void;
  highlightedIndex?: number;
  onDraw?: () => void;
}

export interface ExtendedGameBoardProps extends GameBoardProps {
  onInitiateAttack: (index: number) => void;
  onSelectTarget: (targetIndex?: number) => void;
  onChangeMode: (index: number) => void;
  isSelectingTarget: boolean;
  opponentZones: any[];
}

export interface BoardGutterProps {
  type: string;
  onDraw?: () => void;
  deckCount?: number;
}

export interface BoardSideProps {
  isOpponent?: boolean;
  isSelectingTarget?: boolean;
  onSelectTarget?: (index: number) => void;
  isSelecting?: boolean;
  highlightedIndex?: number;
  focusedZoneIndex?: number;
  onZoneSelect?: (index: number) => void;
  onInitiateAttack?: (index: number) => void;
  onChangeMode?: (index: number) => void;
}
