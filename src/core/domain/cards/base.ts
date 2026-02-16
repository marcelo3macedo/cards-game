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
  public effectScript?: string; // Opcional conforme o uso
  public effectValue?: object;

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
