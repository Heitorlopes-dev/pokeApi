export function ErrorMessage() {
    return (
        <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl w-full max-w-2xl shadow-sm">
            <div className="bg-red-100 p-2 rounded-lg">
                <span className="text-red-600 font-bold">⚠</span>
            </div>
            <div>
                <h3 className="text-red-800 font-semibold">Erro ao carregar Pokémon</h3>
                <p className="text-red-600 text-sm">Não foi possível se comunicar com a PokéAPI. Tente novamente mais tarde.</p>
            </div>
        </div>
    )
}