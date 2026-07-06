import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonByName } from "../services/pokemon";
import { Loading } from "../components/Loading";
import { ErrorMessage } from "../components/ErrorMessage";
import { typeColors } from "../components/PokemonCard";

export function PokemonDetails() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const { data: pokemon, isLoading, isError } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemonByName(name as string),
    enabled: !!name,
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10 pb-20 px-4">
      {/* Botão de voltar */}
      <div className="w-full max-w-5xl flex justify-start mb-6">
        <button
          onClick={() => navigate('/')}
          className="text-red-600 hover:text-red-800 font-semibold flex items-center gap-2 transition"
        >
          &larr; Voltar para a Pokédex
        </button>
      </div>

      {isLoading && <Loading />}
      {isError && <ErrorMessage />}

      {pokemon && !isLoading && !isError && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row border border-gray-100">

          {/* LADO ESQUERDO: Imagem e Informações Básicas */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col items-center bg-gradient-to-b from-gray-50 to-white border-b md:border-b-0 md:border-r border-gray-100">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 capitalize text-center">
              {pokemon.name}
            </h1>
            <p className="text-gray-400 font-medium text-xl mb-8">{pokemon.number}</p>

            <div className="bg-white rounded-full p-6 mb-8 w-64 h-64 flex justify-center items-center shadow-lg border-4 border-gray-50 relative">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-56 h-56 object-contain hover:scale-110 transition-transform duration-300 relative z-10"
              />
            </div>

            <div className="flex gap-3 mt-auto">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className={`${typeColors[type.toLowerCase()] || 'bg-gray-200 text-gray-800'} px-8 py-2.5 rounded-full font-bold function name(params:type) {
                    text-lg
                  } shadow-md tracking-wide uppercase`}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* LADO DIREITO: Detalhes, Entrada da Dex, Peso e Status Base */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-red-500">Pokédex</span> Entry
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg italic border-l-4 border-red-500 pl-4 py-1 bg-red-50/30 rounded-r-lg">
                "{pokemon.description}"
              </p>
            </div>

            <div className="flex gap-8 mb-10 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="flex flex-col">
                <span className="text-gray-400 font-semibold text-sm uppercase tracking-wider mb-1">Peso</span>
                <span className="text-2xl font-bold text-gray-800">{pokemon.weight} <span className="text-lg text-gray-500 font-medium">kg</span></span>
              </div>
              <div className="w-px bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-gray-400 font-semibold text-sm uppercase tracking-wider mb-1">Altura</span>
                <span className="text-2xl font-bold text-gray-800">{pokemon.height} <span className="text-lg text-gray-500 font-medium">m</span></span>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-blue-500">Base</span> Stats
              </h3>
              <div className="flex flex-col gap-4">
                {pokemon.stats.map((stat) => {
                  // Mapear os nomes longos da API para siglas curtas
                  const statNameMap: Record<string, string> = {
                    'hp': 'HP',
                    'attack': 'ATK',
                    'defense': 'DEF',
                    'special-attack': 'SpA',
                    'special-defense': 'SpD',
                    'speed': 'SPD'
                  };
                  const label = statNameMap[stat.name] || stat.name.toUpperCase();

                  // Calcular a porcentagem baseada num valor máximo teórico (ex: 255)
                  const percentage = Math.min((stat.value / 255) * 100, 100);

                  // Definir cor dependendo do quão alto é o status
                  const colorClass =
                    stat.value >= 100 ? 'bg-green-500' :
                      stat.value >= 70 ? 'bg-yellow-400' :
                        stat.value >= 40 ? 'bg-orange-400' : 'bg-red-500';

                  return (
                    <div key={stat.name} className="flex items-center gap-4">
                      <span className="w-12 text-sm font-bold text-gray-500 text-right">{label}</span>
                      <span className="w-8 text-right font-bold text-gray-800">{stat.value}</span>
                      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClass}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
