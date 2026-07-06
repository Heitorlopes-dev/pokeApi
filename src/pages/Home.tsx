import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "../components/SearchBar";
import { PokemonCard } from '../components/PokemonCard';
import { Loading } from "../components/Loading";
import { ErrorMessage } from "../components/ErrorMessage";
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
    const matchesName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || pokemon.types.includes(selectedType);
    return matchesName && matchesType;
  });

  const totalPages = filteredPokemons ? Math.ceil(filteredPokemons.length / itemsPerPage) : 0;

  const currentPokemons = filteredPokemons?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10 pb-20 px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-2">Pokédex</h1>
      <p className="text-gray-500 mb-6">A Primeira Geração (Kanto)</p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
        <SearchBar
          placeholder="Procure por nome (ex: Pika...)"
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
        {isLoading && <div className="flex justify-center"><Loading /></div>}

        {isError && <div className="flex justify-center"><ErrorMessage /></div>}

        {filteredPokemons && !isLoading && !isError && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {currentPokemons?.map((pokemon) => (
              <PokemonCard
                key={pokemon.number}
                name={pokemon.name}
                number={pokemon.number}
                image={pokemon.image}
                types={pokemon.types}
              />
            ))}

            {filteredPokemons.length === 0 && (
              <p className="col-span-full text-center text-gray-500">Nenhum Pokémon encontrado com este nome.</p>
            )}
          </div>
        )}
      </div>

      {filteredPokemons && filteredPokemons.length > 0 && !isLoading && !isError && (
        <div className="flex flex-col items-center mt-10 gap-4">
          <div className="flex justify-center items-center space-x-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-red-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-700 transition shadow-sm"
            >
              Anterior
            </button>

            <span className="text-gray-700 font-medium">
              Página {currentPage} de {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-red-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-700 transition shadow-sm"
            >
              Próximo
            </button>
          </div>

          <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
            <label htmlFor="itemsPerPage">Mostrar por página:</label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border-2 border-gray-300 rounded-md p-1 focus:outline-none focus:border-red-500 bg-white"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={1025}>Todos (1025)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
