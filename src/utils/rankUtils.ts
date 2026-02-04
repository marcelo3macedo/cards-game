export function getRankName(level: number): string {
  if (level >= 100) return "Rei dos Jogos (Lenda)";
  if (level >= 80)  return "Arquiduelista Cósmico";
  if (level >= 65)  return "Guardião das Sombras";
  if (level >= 50)  return "Mestre de Ritual";
  if (level >= 40)  return "Duelista de Prestígio";
  if (level >= 30)  return "Invocador Veterano";
  if (level >= 20)  return "Mestre dos Magos";
  if (level >= 15)  return "Duelista de Elite";
  if (level >= 10)  return "Duelista Profissional";
  if (level >= 5)   return "Aprendiz de Duelos";

  return "Duelista Novato";
}
