import { Card } from "../Card";

interface FieldZoneProps {
  card: any | null;
  mode?: 'atk' | 'def';
}

export function FieldZone({ card, mode }: FieldZoneProps) {
  return (
    <div className="w-24 h-32 border-2 border-blue-500/20 bg-zinc-900/80 rounded-lg flex items-center justify-center relative transition-all">
      {card && (
        <div className={`transition-transform duration-500 ${mode === 'def' ? 'rotate-90 scale-75' : 'scale-90'}`}>
          <Card card={card} />
        </div>
      )}
    </div>
  );
}