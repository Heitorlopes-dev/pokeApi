import { z } from 'zod';

const pokeApiGraphQLSchema = z.object({
    data: z.object({
        pokemon_v2_pokemon: z.array(
            z.object({
                id: z.number(),
                name: z.string(),
                pokemon_v2_pokemontypes: z.array(
                    z.object({
                        pokemon_v2_type: z.object({
                            name: z.string()
                        })
                    })
                )
            })
        )
    })
});
export interface PokemonSimpleData {
    name: string;
    number: string;
    image: string;
    types: string[];
}

export async function fetchAllPokemon(): Promise<PokemonSimpleData[]> {
    // Usamos GraphQL para pedir exatamente os campos que queremos para os 1025 Pokémons, em 1 única requisição!
    const query = `
      query {
        pokemon_v2_pokemon(limit: 1025) {
          id
          name
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
        }
      }
    `;

    const response = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    if (!response.ok) {
        throw new Error('Falha ao buscar a lista de Pokémons!');
    }

    // 2. Transforma a resposta em JSON (sem desestruturar o 'data' ainda)
    const json = await response.json();

    // 3. O Zod valida o json contra o nosso schema
    const validResponse = pokeApiGraphQLSchema.parse(json);

    // 4. Mapeamos os dados! 
    // Repare que não usamos mais "any" pois o Zod já garantiu pro TypeScript que os dados estão corretos.
    return validResponse.data.pokemon_v2_pokemon.map((pokemon) => {
        return {
            name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
            number: `#${pokemon.id.toString().padStart(3, '0')}`,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
            types: pokemon.pokemon_v2_pokemontypes.map((t) => t.pokemon_v2_type.name)
        };
    });
}

export interface PokemonDetailedData extends PokemonSimpleData {
    weight: number;
    height: number;
    stats: { name: string; value: number }[];
    description: string;
}

// --------------------------------------------------------
// Nova função para buscar os dados completos de 1 Pokémon
// --------------------------------------------------------
export async function fetchPokemonByName(name: string): Promise<PokemonDetailedData> {
    const safeName = name.toLowerCase();

    // Dispara as duas requisições ao mesmo tempo para ganhar tempo
    const [pokemonRes, speciesRes] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${safeName}`),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${safeName}`)
    ]);
    
    if (!pokemonRes.ok || !speciesRes.ok) {
        throw new Error('Pokémon não encontrado');
    }

    const data = await pokemonRes.json();
    const speciesData = await speciesRes.json();

    // A PokéAPI tem dezenas de línguas, vamos pegar a em inglês e limpar os "enters" do texto
    const flavorTextEntry = speciesData.flavor_text_entries.find(
        (entry: any) => entry.language.name === 'en'
    );
    const description = flavorTextEntry 
        ? flavorTextEntry.flavor_text.replace(/[\n\f\r]/g, ' ') 
        : 'Descrição não disponível.';

    return {
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
        number: `#${data.id.toString().padStart(3, '0')}`,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        types: data.types.map((t: any) => t.type.name),
        weight: data.weight / 10, // Converter hectogramas para KG
        height: data.height / 10, // Converter decímetros para Metros
        stats: data.stats.map((s: any) => ({
            name: s.stat.name,
            value: s.base_stat
        })),
        description
    };
}