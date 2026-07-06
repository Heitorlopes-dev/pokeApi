
// typagem pra garantir que a api vai mandar os dados no formato que a gente espera
export interface PokemonData {
    name: string;
    number: string;
    image: string;
    type: string;
}

// Ensinamos ao TypeScript o que vem na lista inicial
export interface PokeApiListItem {
    name: string;
    url: string;
}

// função assincrona que espera a resposta da internet
export async function fetchPokemon(pokemonName: string): Promise<PokemonData> {

    // Fazemos a chamada HTTP. Deixamos o texto sempre minúsculo, pois a API exige assim.
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

    // Tratamento de erro básico (ex: o usuário digitou um nome que não existe)
    if (!response.ok) {
        throw new Error('Pokémon não encontrado!');
    }

    // Convertemos a resposta da internet para JSON (objeto Javascript)
    const data = await response.json();

    // Pegando so os dados relevantes
    return {
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1), // Deixa a primeira letra maiúscula
        number: `#${data.id.toString().padStart(3, '0')}`, // Transforma "25" em "#025"
        image: data.sprites.other['official-artwork'].front_default, // Pega a arte oficial bonita
        type: data.types[0].type.name // Pega o primeiro tipo do Pokémon (ex: "electric")
    };
}
// Interface simplificada, sem o tipo obrigatório!
export interface PokemonSimpleData {
    name: string;
    number: string;
    image: string;
}

export async function fetchFirst151Pokemon(): Promise<PokemonSimpleData[]> {
    // Busca 151 resultados de uma só vez (é um array com {name, url})
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');

    if (!response.ok) {
        throw new Error('Falha ao buscar a lista de Pokémons!');
    }

    const data = await response.json();

    // Aqui mapeamos a resposta da API para a nossa interface.
    // Usamos um truque para descobrir o ID cortando a URL que a API nos devolve.
    return data.results.map((pokemon: PokeApiListItem) => {
        // A url é algo tipo "https://pokeapi.co/api/v2/pokemon/1/"
        const urlParts = pokemon.url.split('/');
        const id = urlParts[urlParts.length - 2];

        return {
            name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
            number: `#${id.toString().padStart(3, '0')}`,
            // Descobrimos o link "oficial" que a API usa para armazenar as imagens
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        };
    });
}