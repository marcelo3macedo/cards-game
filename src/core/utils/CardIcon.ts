import iconIce from "@/assets/icons/attribute_ice.jpg";
import iconDark from "@/assets/icons/attribute_dark.jpg";
import iconFire from "@/assets/icons/attribute_fire.jpg";
import iconSpell from "@/assets/icons/attribute_spell.jpg";

export type AttributeType = "ice" | "dark" | "fire" | "spell" | "trap";

export const getAttributeIcon = (type: string | AttributeType): string => {
  const icons: Record<string, string> = {
    ice: iconIce,
    dark: iconDark,
    fire: iconFire,
    spell: iconSpell,
    default: iconDark,
  };

  return icons[type] || icons.default;
};
