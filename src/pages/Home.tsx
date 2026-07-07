import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "../components/SearchBar";
import { PokemonCard } from '../components/PokemonCard';
import { SkeletonCard } from "../components/SkeletonCard";
import { ErrorMessage } from "../components/ErrorMessage";
import { Pagination } from "../components/Pagination";
import { FloatingScrollButtons } from "../components/FloatingScrollButtons";
import { fetchAllPokemon } from "../services/pokemon";

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10 pb-20 px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-2">Pokédex</h1>
      {/* <p className="text-gray-500 mb-6">A (Kanto)</p> */}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
        <SearchBar
          placeholder="Procure por nome ou número..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            setCurrentPage(1);
          }}
          className="border-2 border-blue-400 rounded-lg p-2 h-[44px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white capitalize text-gray-700"
        >
          <option value="">Todos</option>
          <option value="normal">Normal</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="electric">Electric</option>
          <option value="grass">Grass</option>
          <option value="ice">Ice</option>
          <option value="fighting">Fighting</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="flying">Flying</option>
          <option value="psychic">Psychic</option>
          <option value="bug">Bug</option>
          <option value="rock">Rock</option>
          <option value="ghost">Ghost</option>
          <option value="dragon">Dragon</option>
        </select>
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
              <p className="col-span-full text-center text-gray-500">Nenhum Pokémon encontrado com este nome ou número.</p>
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
