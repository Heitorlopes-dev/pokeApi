import { Link } from 'react-router-dom';

interface PokemonCardProps {
    name: string;
    number: string;
    image: string;
    types?: string[];
}
// Cores das tipagens
export const typeColors: Record<string, string> = {
    normal: 'bg-[#A8A77A] text-white',
    fire: 'bg-[#EE8130] text-white',
    water: 'bg-[#6390F0] text-white',
    electric: 'bg-[#F7D02C] text-gray-800',
    grass: 'bg-[#7AC74C] text-gray-900',
    ice: 'bg-[#96D9D6] text-gray-800',
    fighting: 'bg-[#C22E28] text-white',
    poison: 'bg-[#A33EA1] text-white',
    ground: 'bg-[#E2BF65] text-gray-900',
    flying: 'bg-[#7AE7F2] text-gray-900',
    psychic: 'bg-[#F95587] text-white',
    bug: 'bg-[#A6B91A] text-gray-900',
    rock: 'bg-[#B6A136] text-white',
    ghost: 'bg-[#735797] text-white',
    dragon: 'bg-[#6F35FC] text-white',
    dark: 'bg-[#705746] text-white',
    steel: 'bg-[#B7B7CE] text-gray-900',
    fairy: 'bg-[#D685AD] text-gray-900',
};

export function PokemonCard({ name, number, image, types }: PokemonCardProps) {
    return (
        <Link
            to={`/pokemon/${name.toLowerCase()}`}
            className="flex flex-col items-center bg-white border-2 border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
            <p className="text-gray-400 font-bold self-start">{number}</p>
            <img src={image} alt={name} className="w-28 h-28 hover:scale-110 transition-transform duration-300" />
            <h1 className="text-lg font-bold text-gray-800 capitalize mt-2">{name}</h1>

            {/* O React só desenha isso se a variável 'types' existir e tiver itens! */}
            {types && types.length > 0 && (
                <div className="flex gap-2 mt-2">
                    {types.map((type) => (
                        <p key={type} className={`${typeColors[type.toLowerCase()] || 'bg-gray-200 text-gray-800'} px-3 py-1 rounded-full text-sm font-semibold capitalize shadow-sm`}>
                            {type}
                        </p>
                    ))}
                </div>
            )}
        </Link>
    )
}