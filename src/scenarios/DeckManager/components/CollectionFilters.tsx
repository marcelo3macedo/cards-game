import { Search, ArrowUpDown } from "lucide-react";

export const CollectionFilters = ({ searchTerm, setSearchTerm, sortBy, setSortBy, filterType, setFilterType }: any) => (
  <div className="p-4 bg-black/20 space-y-4">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
      <input
        type="text"
        value={searchTerm}
        placeholder="Buscar na coleção..."
        className="w-full bg-zinc-800/50 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm focus:border-blue-500 outline-none transition-all"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    <div className="flex gap-2">
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="flex-1 bg-zinc-800 border border-white/10 rounded-lg p-2 text-[10px] font-bold uppercase outline-none focus:border-blue-500"
      >
        <option value="TODOS">Todos</option>
        <option value="monster">Monstros</option>
        <option value="spell">Mágicas</option>
        <option value="trap">Armadilhas</option>
      </select>
      <button
        onClick={() => setSortBy(sortBy === "NAME" ? "ATK" : "NAME")}
        className="px-4 bg-zinc-800 border border-white/10 rounded-lg text-[10px] font-bold uppercase flex items-center gap-2 hover:bg-zinc-700"
      >
        <ArrowUpDown size={14} /> {sortBy === "NAME" ? "Nome" : "ATK"}
      </button>
    </div>
  </div>
);
