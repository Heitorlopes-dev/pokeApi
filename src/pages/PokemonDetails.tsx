import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonByName } from "../services/pokemon";
import { SkeletonDetails } from "../components/SkeletonDetails";
import { ErrorMessage } from "../components/ErrorMessage";
import { typeColors } from "../utils/constants";
import { DetailsNavigation } from "../components/DetailsNavigation";
import { BaseStats } from "../components/BaseStats";
import { EvolutionChain } from "../components/EvolutionChain";

export function PokemonDetails() {
  const { name } = useParams<{ name: string }>();
  const { data: pokemon, isLoading, isError } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemonByName(name as string),
    enabled: !!name,
  });

  return (
    <div className="min-h-screen bg-red-600 flex flex-col items-center pt-10 pb-20 px-4">
      {/* Navegação Topo */}
      <DetailsNavigation pokemon={pokemon} />

      {isLoading && <div className="w-full flex justify-center mt-10"><SkeletonDetails /></div>}
      {isError && <ErrorMessage />}

      {pokemon && !isLoading && !isError && (
        <div className="flex flex-col gap-8 max-w-5xl w-full">
          <div className="bg-slate-900 rounded-2xl shadow-[8px_8px_0_0_rgba(0,0,0,0.6)] overflow-hidden w-full flex flex-col md:flex-row border-4 border-slate-900 relative">

            {/* LADO ESQUERDO: Imagem e Informações Básicas */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col items-center bg-slate-800 border-b-4 md:border-b-0 md:border-r-4 border-slate-900 relative">
              <div className="absolute top-4 left-4 w-4 h-4 bg-red-500 rounded-full shadow-[inset_-1px_-1px_0_rgba(0,0,0,0.5)] border-2 border-slate-900"></div>
              <div className="absolute top-4 left-10 w-4 h-4 bg-yellow-400 rounded-full shadow-[inset_-1px_-1px_0_rgba(0,0,0,0.5)] border-2 border-slate-900"></div>
              <div className="absolute top-4 left-16 w-4 h-4 bg-green-500 rounded-full shadow-[inset_-1px_-1px_0_rgba(0,0,0,0.5)] border-2 border-slate-900"></div>

              <h1 className="text-4xl md:text-5xl font-black text-white mb-2 capitalize text-center tracking-widest drop-shadow-[2px_2px_0_rgba(0,0,0,1)] mt-4">
                {pokemon.name}
              </h1>
              <p className="text-slate-400 font-bold font-retro text-3xl mb-8">{pokemon.number}</p>

              <div className="bg-slate-200 rounded-xl p-6 mb-8 w-64 h-64 flex justify-center items-center shadow-[inset_4px_4px_10px_rgba(0,0,0,0.2)] border-4 border-slate-900 relative">
                <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full shadow-[inset_-1px_-1px_0_rgba(0,0,0,0.3)]"></div>
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="w-56 h-56 object-contain hover:scale-110 transition-transform duration-300 relative z-10 drop-shadow-md"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-3 mt-auto">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className={`${typeColors[type.toLowerCase()] || 'bg-gray-200 text-gray-800'} px-6 py-2 rounded-full font-bold text-sm tracking-widest uppercase border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(0,0,0,1)]`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* LADO DIREITO: Detalhes, Entrada da Dex, Peso e Status Base */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-slate-100">

              <div className="mb-8 relative">
                <div className="bg-[#8b9a70] p-5 border-4 border-slate-900 rounded-lg relative shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3)] overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(transparent,transparent_2px,#000_2px,#000_4px)]"></div>
                  <h3 className="text-sm font-bold text-[#2e3b1f] mb-2 uppercase tracking-widest font-retro z-10 relative">
                    DADOS DA POKÉDEX
                  </h3>
                  <p className="text-[#1a2410] leading-relaxed text-lg font-retro z-10 relative uppercase">
                    "{pokemon.description}"
                  </p>
                </div>
              </div>

              <div className="flex gap-2 md:gap-8 mb-10 bg-slate-800 p-4 md:p-6 rounded-xl border-4 border-slate-900 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]">
                <div className="flex flex-col flex-1 items-center justify-center text-center">
                  <span className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">PESO</span>
                  <span className="text-xl md:text-2xl font-bold text-white font-retro tracking-wider">{pokemon.weight} <span className="text-sm md:text-lg text-slate-500 font-medium">kg</span></span>
                </div>
                <div className="w-1 bg-slate-900 rounded-full shrink-0"></div>
                <div className="flex flex-col flex-1 items-center justify-center text-center">
                  <span className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">ALTURA</span>
                  <span className="text-xl md:text-2xl font-bold text-white font-retro tracking-wider">{pokemon.height} <span className="text-sm md:text-lg text-slate-500 font-medium">m</span></span>
                </div>
              </div>

              <BaseStats stats={pokemon.stats} />

            </div>
          </div>
          <EvolutionChain evolutions={pokemon.evolutions} />
        </div>
      )}
    </div>
  );
}
