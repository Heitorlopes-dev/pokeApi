import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "../components/SearchBar";
import { PokemonCard } from '../components/PokemonCard';
import { SkeletonCard } from "../components/SkeletonCard";
import { ErrorMessage } from "../components/ErrorMessage";
import { Pagination } from "../components/Pagination";
import { FloatingScrollButtons } from "../components/FloatingScrollButtons";
import { fetchAllPokemon } from "../services/pokemon";
import { typeColors } from "../utils/constants";

export function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemons-list-v3'],
    queryFn: fetchAllPokemon,
  });

  const filteredPokemons = data?.filter((pokemon) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesNameOrNumber = pokemon.name.toLowerCase().includes(searchLower) || pokemon.number.toString().includes(searchLower);
    const matchesType = selectedType === '' || pokemon.types.includes(selectedType);
    return matchesNameOrNumber && matchesType;
  });

  const totalPages = filteredPokemons ? Math.ceil(filteredPokemons.length / itemsPerPage) : 0;

  const currentPokemons = filteredPokemons?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const availableTypes = Object.keys(typeColors);

  return (
    <div className="min-h-screen bg-red-600 flex flex-col items-center pt-10 pb-20 px-4">
      <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 font-retro tracking-widest drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">POKÉDEX</h1>


      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-4xl">
        <SearchBar
          placeholder="Procure por nome ou número..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div className="flex gap-2 overflow-x-auto w-full pb-2 no-scrollbar px-2 snap-x">
          <button
            onClick={() => {
              setSelectedType('');
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full font-bold uppercase tracking-wide text-sm whitespace-nowrap transition-transform active:scale-95 snap-center ${
              selectedType === ''
                ? 'bg-slate-900 text-white shadow-[0_4px_0_0_rgba(0,0,0,0.3)] border-2 border-slate-900'
                : 'bg-white text-slate-700 border-2 border-slate-300 hover:border-slate-500'
            }`}
          >
            Todos
          </button>
          {availableTypes.map((type) => {
            const isSelected = selectedType === type;
            const styleClasses = typeColors[type] || 'bg-gray-200 text-gray-800';
            return (
              <button
                key={type}
                onClick={() => {
                  setSelectedType(type);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full font-bold uppercase tracking-wide text-sm whitespace-nowrap transition-all active:scale-95 snap-center border-2 border-slate-900 ${
                  isSelected ? 'scale-105 shadow-[0_4px_0_0_rgba(0,0,0,0.5)] ring-2 ring-white ring-offset-2 ring-offset-red-600' : 'opacity-90 hover:opacity-100 hover:shadow-[0_2px_0_0_rgba(0,0,0,0.5)]'
                } ${styleClasses}`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 w-full max-w-6xl">
        {isError && <div className="flex justify-center"><ErrorMessage /></div>}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {isLoading && Array.from({ length: itemsPerPage }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
            {currentPokemons?.map((pokemon) => (
              <PokemonCard
                key={pokemon.number}
                name={pokemon.name}
                number={pokemon.number}
                image={pokemon.image}
                types={pokemon.types}
              />
            ))}

            {filteredPokemons && filteredPokemons.length === 0 && !isLoading && !isError && (
              <div className="col-span-full flex flex-col items-center justify-center py-16 bg-red-700/50 rounded-2xl border-4 border-dashed border-red-800">
                <p className="text-xl text-red-100 font-bold mb-2">Nenhum Pokémon encontrado!</p>
                <p className="text-red-200 text-sm">Tente limpar a busca ou os filtros.</p>
              </div>
            )}
          </div>
      </div>

      {filteredPokemons && filteredPokemons.length > 0 && !isLoading && !isError && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(items) => {
            setItemsPerPage(items);
            setCurrentPage(1);
          }}
        />
      )}

      <FloatingScrollButtons />
    </div>
  )
}
