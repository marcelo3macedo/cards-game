export default function WelcomeScenario({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-zinc-950 to-black">
      <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-600 mb-8 tracking-tighter uppercase italic">
        Rei dos Duelos
      </h1>

      <button
        onClick={onStart}
        className="group relative px-8 py-3 font-bold text-white transition-all duration-300"
      >
        <div className="absolute inset-0 bg-blue-600 skew-x-[-20deg] group-hover:bg-blue-500 group-hover:scale-105 transition-all"></div>
        <span className="relative uppercase tracking-widest">Iniciar Duelo</span>
      </button>

      <p className="mt-10 text-zinc-500 text-sm animate-pulse">
        Pressione para conectar ao servidor
      </p>
    </div>
  );
}
