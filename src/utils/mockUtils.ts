import { mapServerCardToEntity } from "./cardUtils";

const mockMonsterInAttackMode = mapServerCardToEntity({
    "id": 27,
    "name": "Íbis Mensageiro Divino",
    "description": "Voo silencioso atravessa os véus do amanhecer, trazendo decretos sagrados dos desígnios celestiais. Suas penas cintilam com escrita etérea, enquanto cada clac de asas ecoa a verdade que transcende as eras, guiando almas perdidas ao caminho da redenção.",
    "imageUrl": "/images/cards/1848_Íbis_Mensageiro_Divino_1770041838597.jpg",
    "type": "Íbis de Thoth",
    "mode": "atk",
    "element": "wind",
    "attribute": "monster",
    "stars": 1,
    "attackPower": 2600,
    "defensePower": 2700,
    "effectScript": null,
    "effectValue": null,
    "createdAt": null,
    "updatedAt": null
});

const mockMonsterInDefenseMode = mapServerCardToEntity({
    "id": 27,
    "name": "Íbis Mensageiro Divino",
    "description": "Voo silencioso atravessa os véus do amanhecer, trazendo decretos sagrados dos desígnios celestiais. Suas penas cintilam com escrita etérea, enquanto cada clac de asas ecoa a verdade que transcende as eras, guiando almas perdidas ao caminho da redenção.",
    "imageUrl": "/images/cards/1848_Íbis_Mensageiro_Divino_1770041838597.jpg",
    "type": "Íbis de Thoth",
    "mode": "def",
    "element": "wind",
    "attribute": "monster",
    "stars": 1,
    "attackPower": 2600,
    "defensePower": 2700,
    "effectScript": null,
    "effectValue": null,
    "createdAt": null,
    "updatedAt": null
});

export { mockMonsterInAttackMode, mockMonsterInDefenseMode }
