import { useNavigate } from "react-router-dom";
import type { PokemonDetailedData } from "../services/pokemon";

interface DetailsNavigationProps {
    pokemon: PokemonDetailedData | undefined;
}

export function DetailsNavigation({ pokemon }: DetailsNavigationProps) {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-5xl flex justify-between items-center mb-6">
            <button
                onClick={() => navigate('/')}
                className="text-red-600 hover:text-red-800 font-semibold flex items-center gap-2 transition"
            >
                &larr; Voltar
            </button>

            {pokemon && (
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate(`/pokemon/${Number(pokemon.number.replace('#', '')) - 1}`)}
                        disabled={Number(pokemon.number.replace('#', '')) <= 1}
                        className="px-4 py-2 bg-white text-red-600 font-semibold border border-red-600 rounded-full disabled:border-gray-300 disabled:text-gray-300 hover:bg-red-50 transition flex items-center gap-2 shadow-sm"
                    >
                        &larr; Anterior
                    </button>
                    <button
                        onClick={() => navigate(`/pokemon/${Number(pokemon.number.replace('#', '')) + 1}`)}
                        disabled={Number(pokemon.number.replace('#', '')) >= 1025}
                        className="px-4 py-2 bg-white text-red-600 font-semibold border border-red-600 rounded-full disabled:border-gray-300 disabled:text-gray-300 hover:bg-red-50 transition flex items-center gap-2 shadow-sm"
                    >
                        Próximo &rarr;
                    </button>
                </div>
            )}
        </div>
    );
}
