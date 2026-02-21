import { EquipCard, MagicCard, MonsterCard, TerrainCard, TrapCard, type BaseCard } from "../core/domain/Card";

export function mapServerCardToEntity(data: any): any | undefined {
  if (!data) return;

  if (typeof data.getStyle === "function") return data;

  const {
    id,
    name,
    mode,
    description,
    imageUrl,
    attribute,
    attackPower,
    defensePower,
    stars,
    element,
    effectScript,
    effectValue,
    modifiers
  } = data;

  switch (attribute?.toLowerCase()) {
    case "monster":
      return new MonsterCard(
        String(id),
        name,
        description,
        imageUrl,
        mode,
        element,
        attackPower,
        defensePower,
        stars,
        data.monsterRarity || "LEGENDARIO",
        effectScript,
        effectValue,
        modifiers
      );

    case "spell":
    case "magic":
      return new MagicCard(String(id), name, description, imageUrl, mode, element, effectScript, effectValue);

    case "trap":
      return new TrapCard(String(id), name, description, imageUrl, mode, element, effectScript, effectValue);

    case "equip":
      return new EquipCard(String(id), name, description, imageUrl, mode, element, effectScript, effectValue);

    case "terrain":
      return new TerrainCard(String(id), name, description, imageUrl, mode, element, effectScript, effectValue);

    default:
      return new MonsterCard(String(id), name, description, imageUrl, mode, element, 0, 0, 1, "COMUM", modifiers);
  }
}

export const mapHand = (serverHand: any[]): (BaseCard | undefined)[] => {
  return serverHand.map(mapServerCardToEntity);
};

export function isMonsterCard(card: BaseCard) {
  return (
    "atk" in card &&
    "def" in card &&
    "stars" in card
  );
}
