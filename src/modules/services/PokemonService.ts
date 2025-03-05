import axios from "axios";
import { Config } from "../enviroment/Config";
import { Pokemon } from "../types/Pokemon";

export class PokemonService {
    static async getAll(limit?: number): Promise<Pokemon[]> {
        const url = Config.POKEMON_SERVICE_URL;

        const response = await axios.get(url);
        let results = response.data.results;

        // Limitar el número de resultados si se proporciona un límite
        if (limit) {
            results = results.slice(0, limit);
        }

        // Obtiene más detalles de cada Pokémon usando su URL
        const pokemons = await Promise.all(
            results.map(async (result: any) => {
                const pokemonResponse = await axios.get(result.url);
                return Pokemon.mapPokemonData(pokemonResponse.data);
            })
        );  

        return pokemons;
    }

    static async getOne(id: number): Promise<Pokemon> {
        const url = `${Config.POKEMON_SERVICE_URL}/${id}`;
        const response = await axios.get(url);
        return Pokemon.mapPokemonData(response.data);
    }
}