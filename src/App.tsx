import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "./components/SearchBar";
import { PokemonCard } from './components/PokemonCard';
import { Loading } from "./components/Loading";
import { ErrorMessage } from "./components/ErrorMessage";
import { fetchFirst151Pokemon } from "./services/pokemon";

export function App() {
  // O que o usuário digitar será guardado aqui e atualizado em tempo real
  const [searchTerm, setSearchTerm] = useState('');

  // Busca os 151 logo na abertura do aplicativo!
  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemons-gen1'],
    queryFn: fetchFirst151Pokemon,
  });

  // Aqui filtra o array original com base nas letras que o usuário digitar na SearchBar
  const filteredPokemons = data?.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10 pb-20 px-4">

      <h1 className="text-4xl font-bold text-red-600 mb-2">Pokédex</h1>
      <p className="text-gray-500 mb-6">A Primeira Geração (Kanto)</p>

      {/* Já que a ideia é que a lista se atualize conforme o usuario digite, eu retirei o btn e ai ficou só o input mesmo */}
      <SearchBar
        placeholder="Procure por nome (ex: Pika...)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="mt-10 w-full max-w-6xl">
        {isLoading && <div className="flex justify-center"><Loading /></div>}

        {isError && <div className="flex justify-center"><ErrorMessage /></div>}

        {/* tratamento pra renderizar quando o app carregar, não tiver erro e tiver pokemons na lista. 
        Basicamente, verifica se filteredPokemons é truthy, se não está carregando e se não deu erro */}
        {filteredPokemons && !isLoading && !isError && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

            {/* se baseando na lista filtrada, vai criar um card pra cada um dos pokemon */}
            {filteredPokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.number}
                name={pokemon.name}
                number={pokemon.number}
                image={pokemon.image}
              // Não precisamos passar o "type" agora, e ele não vai dar erro porque marcamos com "?" no PokemonCard.tsx já que ele vai aparecer no PokeDesc
              />
            ))}

            {/* Uma mensagem amigável caso a busca dele não encontre nada na lista */}
            {filteredPokemons.length === 0 && (
              <p className="col-span-full text-center text-gray-500">Nenhum Pokémon encontrado com este nome.</p>
            )}

          </div>
        )}
      </div>

    </div>
  )
}