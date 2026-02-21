export interface CardProps {
  card: BaseCard;
  size?: "sm" | "md" | "lg" | "xs";
  isFaceDown?: boolean;
}

export type CardCategory =
  | "COMUM"
  | "RARO"
  | "LEGENDARIO"
  | "MAGICA"
  | "ARMADILHA"
  | "EQUIPAMENTO"
  | "TERRENO";

export abstract class BaseCard {
  public id: string;
  public name: string;
  public description: string;
  public category: CardCategory;
  public image: string;
  public typeIcon: string;
  public mode: string;
  public effectScript?: string;
  public effectValue?: object;
  public modifiers?: any;

  constructor(
    id: string,
    name: string,
    description: string,
    category: CardCategory,
    image: string,
    typeIcon: string,
    mode: string,
    effectScript?: string,
    effectValue?: object
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.image = image;
    this.typeIcon = typeIcon;
    this.mode = mode;
    this.effectScript = effectScript;
    this.effectValue = effectValue;
  }

  abstract getStyle(): string;
}

// --- MONSTRO ---
export class MonsterCard extends BaseCard {
  public atk: number;
  public def: number;
  public stars: number;
  public monsterRarity: "COMUM" | "RARO" | "LEGENDARIO";

  constructor(
    id: string,
    name: string,
    description: string,
    image: string,
    mode: string,
    typeIcon: string,
    atk: number,
    def: number,
    stars: number,
    monsterRarity: "COMUM" | "RARO" | "LEGENDARIO",
    effectScript?: string,
    effectValue?: object,
    modifiers?: any
  ) {
    super(id, name, description, monsterRarity, image, typeIcon, mode, effectScript, effectValue);
    this.atk = atk;
    this.def = def;
    this.stars = stars;
    this.monsterRarity = monsterRarity;
    this.modifiers = modifiers;
  }

  getStyle() {
    if (this.monsterRarity === "COMUM") return "bg-slate-300/90 border-slate-500 text-slate-900 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)]";
    if (this.monsterRarity === "RARO") return "bg-[#E7D3A1]/90 border-[#8B6A2E] text-[#3B2A14] shadow-inner";
    return "bg-[#4B2C7A] border-[#1E1236] text-[#F5E9FF]";
  }
}

// --- MÁGICA ---
export class MagicCard extends BaseCard {
  constructor(
    id: string, name: string, description: string, image: string, mode: string,
    typeIcon: string, effectScript?: string, effectValue?: object
  ) {
    super(id, name, description, "MAGICA", image, typeIcon, mode, effectScript, effectValue);
  }

  getStyle() { return "bg-[#06B6D4] border-[#164E63] text-white"; }
}

// --- ARMADILHA ---
export class TrapCard extends BaseCard {
  constructor(
    id: string, name: string, description: string, image: string, mode: string,
    typeIcon: string, effectScript?: string, effectValue?: object
  ) {
    super(id, name, description, "ARMADILHA", image, typeIcon, mode, effectScript, effectValue);
  }

  getStyle() { return "bg-[#E11D48] border-[#4C0519] text-white"; }
}

// --- EQUIPAMENTO ---
export class EquipCard extends BaseCard {
  constructor(
    id: string, name: string, description: string, image: string, mode: string,
    typeIcon: string, effectScript?: string, effectValue?: object
  ) {
    super(id, name, description, "EQUIPAMENTO", image, typeIcon, mode, effectScript, effectValue);
  }

  getStyle() { return "bg-[#10B981] border-[#064E3B] text-white"; }
}

// --- TERRENO ---
export class TerrainCard extends BaseCard {
  constructor(
    id: string, name: string, description: string, image: string, mode: string,
    typeIcon: string, effectScript?: string, effectValue?: object
  ) {
    super(id, name, description, "TERRENO", image, typeIcon, mode, effectScript, effectValue);
  }

  getStyle() { return "bg-[#4B5563] border-[#111827] text-white"; }
}
