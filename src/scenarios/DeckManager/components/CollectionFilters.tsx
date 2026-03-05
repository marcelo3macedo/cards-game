import { Search, LayoutGrid, List, ArrowUpDown } from "lucide-react";

interface Props {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  filterType: string;
  setFilterType: (v: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (v: "grid" | "list") => void;
  total: number;
}

export const CollectionFilters = ({
  searchTerm, setSearchTerm,
  sortBy, setSortBy,
  filterType, setFilterType,
  viewMode, setViewMode,
  total,
}: Props) => (
  <div className="p-3 bg-black/20 border-b border-white/5 space-y-2">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
      <input
        type="text"
        value={searchTerm}
        placeholder="Buscar carta..."
        className="w-full bg-zinc-800/50 border border-white/5 rounded-lg py-2 pl-9 pr-4 text-[11px] focus:border-blue-500 outline-none transition-all placeholder:text-zinc-600"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    <div className="flex gap-2 items-center">
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-2 py-1.5 text-[10px] font-bold uppercase outline-none focus:border-blue-500 text-zinc-300"
      >
        <option value="TODOS">Todos</option>
        <option value="monster">Monstros</option>
        <option value="spell">Mágicas</option>
        <option value="trap">Armadilhas</option>
      </select>

      <button
        onClick={() => setSortBy(sortBy === "NAME" ? "ATK" : "NAME")}
        className="flex items-center gap-1 px-2.5 py-1.5 bg-zinc-800 border border-white/10 rounded-lg text-[10px] font-bold uppercase hover:bg-zinc-700 transition-colors text-zinc-300"
        title="Ordenar"
      >
        <ArrowUpDown size={12} /> {sortBy === "NAME" ? "Nome" : "ATK"}
      </button>

      <div className="flex border border-white/10 rounded-lg overflow-hidden">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-1.5 transition-colors ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"}`}
          title="Grade"
        >
          <LayoutGrid size={13} />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-1.5 transition-colors ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"}`}
          title="Lista"
        >
          <List size={13} />
        </button>
      </div>
    </div>

    <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
      {total} {total === 1 ? "carta disponível" : "cartas disponíveis"}
    </p>
  </div>
);
