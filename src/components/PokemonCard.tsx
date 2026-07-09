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
            className="flex flex-col items-center bg-white border-4 border-slate-900 rounded-xl p-4 shadow-[4px_4px_0_0_rgba(15,23,42,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_rgba(15,23,42,1)] transition-all duration-200"
        >
            <p className="text-slate-500 font-retro text-lg self-start">{number}</p>
            <img src={image} alt={name} className="w-28 h-28 hover:scale-110 transition-transform duration-300 drop-shadow-md" />
            <h1 className="text-lg font-bold text-slate-900 capitalize mt-2">{name}</h1>

            {/* O React só desenha isso se a variável 'types' existir e tiver itens! */}
            {types && types.length > 0 && (
                <div className="flex gap-2 mt-2">
                    {types.map((type) => (
                        <p key={type} className={`${typeColors[type.toLowerCase()] || 'bg-gray-200 text-gray-800'} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border-2 border-slate-900`}>
                            {type}
                        </p>
                    ))}
                </div>
            )}
        </Link>
    )
}