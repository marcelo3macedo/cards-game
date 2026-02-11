import { MagicCard, MonsterCard, TrapCard, type BaseCard } from "../core/domain/Card";

export function mapServerCardToEntity(data: any): BaseCard | undefined {
  if (!data) return;

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
        data.monsterRarity || "LEGENDARIO"
      );

    case "spell":
    case "magic":
      return new MagicCard(String(id), name, description, "MAGICA", imageUrl, mode, element);

    case "trap":
      return new TrapCard(String(id), name, description, "ARMADILHA", imageUrl, mode, element);

    default:
      return new MonsterCard(String(id), name, description, imageUrl, mode, element, 0, 0, 1, "COMUM");
  }
}

export const mapHand = (serverHand: any[]): (BaseCard | undefined)[] => {
  return serverHand.map(mapServerCardToEntity);
};
