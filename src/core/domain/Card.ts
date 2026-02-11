export type CardCategory =
  | "COMUM"
  | "RARO"
  | "LEGENDARIO"
  | "MAGICA"
  | "ARMADILHA"
  | "EQUIPAMENTO"
  | "TERRENO";

export interface CardProps {
  card: BaseCard;
  size?: "sm" | "md" | "lg" | "xs";
  isFaceDown?: boolean;
}

export abstract class BaseCard {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public category: CardCategory,
    public image: string,
    public typeIcon: string,
    public mode: string
  ) {}

  abstract getStyle(): string;
}

export class MonsterCard extends BaseCard {
  constructor(
    id: string,
    name: string,
    description: string,
    image: string,
    mode: string,
    typeIcon: string,
    public atk: number,
    public def: number,
    public stars: number,
    public monsterRarity: "COMUM" | "RARO" | "LEGENDARIO",
  ) {
    super(id, name, description, monsterRarity, image, typeIcon, mode);
  }

  getStyle() {
    if (this.monsterRarity === "COMUM")
      return `
        bg-slate-300/90
        border-slate-500
        text-slate-900
        bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.5),_transparent_70%)]
        bg-blend-soft-light
        shadow-[inset_0_0_15px_rgba(0,0,0,0.1)]
      `;

    if (this.monsterRarity === "RARO")
      return `
        bg-[#E7D3A1]/90
        border-[#8B6A2E]
        text-[#3B2A14]
        bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.35),_transparent_60%)]
        bg-blend-overlay
        shadow-inner
      `;

    return "bg-[#4B2C7A] border-[#1E1236] text-[#F5E9FF]";
  }
}

export class MagicCard extends BaseCard {
  getStyle() {
    return "bg-[#06B6D4] border-[#164E63] text-white";
  }
}

export class TrapCard extends BaseCard {
  getStyle() {
    return "bg-[#E11D48] border-[#4C0519] text-white";
  }
}

export class EquipCard extends BaseCard {
  getStyle() {
    return "bg-[#10B981] border-[#064E3B] text-white";
  }
}

export class TerrainCard extends BaseCard {
  getStyle() {
    return "bg-[#4B5563] border-[#111827] text-white";
  }
}
