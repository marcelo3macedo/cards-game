export type CardCategory = 'COMUM' | 'RARO' | 'LEGENDARIO' | 'MAGICA' | 'ARMADILHA' | 'EQUIPAMENTO' | 'TERRENO';

export abstract class BaseCard {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public category: CardCategory,
    public image: string,
    public typeIcon: string // URL do ícone (Atributo)
  ) {}

  abstract getStyle(): string; // Retorna as classes Tailwind de cor
}

export class MonsterCard extends BaseCard {
  constructor(
    id: string, name: string, description: string, image: string, typeIcon: string,
    public atk: number,
    public def: number,
    public stars: number,
    public monsterRarity: 'COMUM' | 'RARO' | 'LEGENDARIO'
  ) {
    super(id, name, description, monsterRarity, image, typeIcon);
  }

  getStyle() {    
    if (this.monsterRarity === 'COMUM')
      return `
        bg-[#E7D3A1]/90
        border-[#8B6A2E]
        text-[#3B2A14]
        bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.35),_transparent_60%)]
        bg-blend-overlay
        shadow-inner
      `;

    if (this.monsterRarity === 'RARO')
      return `
        bg-[#D4A017]/85
        border-[#6B4E0F]
        text-[#2A1B05]
        bg-[linear-gradient(135deg,_rgba(255,255,255,0.25),_rgba(0,0,0,0.25))]
        bg-blend-overlay
        shadow-inner
      `;

    return 'bg-[#4B2C7A] border-[#1E1236] text-[#F5E9FF]';
  }
}

export class MagicCard extends BaseCard {
  getStyle() { return 'bg-[#06B6D4] border-[#164E63] text-white'; } // Azul claro
}

export class TrapCard extends BaseCard {
  getStyle() { return 'bg-[#E11D48] border-[#4C0519] text-white'; } // Vermelho
}

export class EquipCard extends BaseCard {
  getStyle() { return 'bg-[#10B981] border-[#064E3B] text-white'; } // Verde
}

export class TerrainCard extends BaseCard {
  getStyle() { return 'bg-[#4B5563] border-[#111827] text-white'; } // Cinza
}