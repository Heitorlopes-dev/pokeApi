interface BaseStatsProps {
    stats: { name: string; value: number }[];
}

export function BaseStats({ stats }: BaseStatsProps) {
    return (
        <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-blue-500">Base</span> Stats
            </h3>
            <div className="flex flex-col gap-4">
                {stats.map((stat) => {
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
    );
}
