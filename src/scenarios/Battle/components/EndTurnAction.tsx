export function EndTurnAction({ handleEndTurn, currentTurnOwner, isOpponentPlaying }: any) {
    const isPlayerTurn = currentTurnOwner === 'player';
    const isDisabled = !isPlayerTurn || isOpponentPlaying;

    const label = isOpponentPlaying
        ? 'OPONENTE JOGANDO'
        : isPlayerTurn
            ? 'ENCERRAR TURNO'
            : 'TURNO RIVAL';

    return (
        <div className="absolute right-1 sm:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 sm:gap-4">
            <button
                data-testid="button-endturn"
                onClick={handleEndTurn}
                disabled={isDisabled}
                className={`
                    group relative px-4 py-2 sm:px-8 sm:py-3 font-black italic text-sm sm:text-xl tracking-tighter transition-all duration-300
                    ${isPlayerTurn && !isOpponentPlaying
                    ? 'bg-amber-500 hover:bg-amber-400 text-black cursor-pointer skew-x-[-12deg] hover:scale-110 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50 skew-x-[-12deg]'}
                `}
            >
                <span className="absolute top-0 left-0 w-full h-full border-2 border-white/20 translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></span>

                <span className="relative z-10 flex items-center gap-2">
                    {isOpponentPlaying && (
                        <span className="inline-block w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                    )}
                    {label}
                </span>
            </button>

            <div className="hidden sm:flex flex-col items-end gap-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                    {isOpponentPlaying ? 'Aguardando rival...' : 'Status do Duelo'}
                </p>
                <div className={`h-1 w-32 rounded-full overflow-hidden bg-zinc-800`}>
                    <div
                        className={`h-full transition-all duration-700 ${
                            isOpponentPlaying
                                ? 'w-full bg-red-500 animate-pulse'
                                : isPlayerTurn
                                    ? 'w-full bg-blue-500'
                                    : 'w-0 bg-red-500'
                        }`}
                    />
                </div>
            </div>
        </div>
    );
}
