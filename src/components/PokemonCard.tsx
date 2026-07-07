import { Link } from 'react-router-dom';
import { typeColors } from '../utils/constants';

interface PokemonCardProps {
    name: string;
    number: string;
    image: string;
    types?: string[];
}

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