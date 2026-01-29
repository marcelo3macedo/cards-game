import { Star } from "lucide-react";

export const DuelRating = ({ score }: { score: number }) => {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={32}
          className={`${
            star <= score
              ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]"
              : "text-zinc-800"
          } transition-all duration-700`}
        />
      ))}
    </div>
  );
};
