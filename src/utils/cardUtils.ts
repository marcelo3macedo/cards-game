import { MagicCard, MonsterCard, TrapCard, type BaseCard } from "../core/domain/Card";

export function mapServerCardToEntity(data: any): BaseCard | undefined {
  if (!data) return;

  const {
    id,
    name,
    description,
    imageUrl,
    attribute,
    attackPower,
    defensePower,
    stars,
    element,
  } = data;

  switch (attribute?.toLowerCase()) {
    case "monster":
      return new MonsterCard(
        String(id),
        name,
        description,
        imageUrl,
        element,
        attackPower,
        defensePower,
        stars,
        data.monsterRarity || "LEGENDARIO"
      );

    case "spell":
    case "magic":
      return new MagicCard(String(id), name, description, "MAGICA", imageUrl, element);

    case "trap":
      return new TrapCard(String(id), name, description, "ARMADILHA", imageUrl, element);

    default:
      return new MonsterCard(String(id), name, description, imageUrl, element, 0, 0, 1, "COMUM");
  }
}

export const mapHand = (serverHand: any[]): (BaseCard | undefined)[] => {
  return serverHand.map(mapServerCardToEntity);
};
