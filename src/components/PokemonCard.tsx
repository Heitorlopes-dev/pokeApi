interface PokemonCardProps {
    name: string;
    number: string;
    image: string;
    type?: string;
}

export function PokemonCard({ name, number, image, type }: PokemonCardProps) {
    return (
        <div className="flex flex-col items-center bg-white border-2 border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <p className="text-gray-400 font-bold self-start">{number}</p>
            <img src={image} alt={name} className="w-28 h-28 hover:scale-110 transition-transform duration-300" />
            <h1 className="text-lg font-bold text-gray-800 capitalize mt-2">{name}</h1>

            {/* O React só desenha isso se a variável 'type' existir! */}
            {type && <p className="bg-gray-200 px-3 py-1 rounded-full text-sm mt-2">{type}</p>}
        </div>
    )
}