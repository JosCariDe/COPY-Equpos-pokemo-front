import axios from "axios";
import { Config } from "../enviroment/Config";
import { getPokemon } from "../interfaces/pokemon";
import { Pokemon } from "../types/Pokemon";

export class PokemonService {
    static async getAll(limit?: number): Promise<Pokemon[]> {
        const url = Config.POKEMON_SERVICE_URL;

        const response = await axios.get(url, { params: { limit  } });
        return response.data.pokemones; 
    }

    static async getOne(id: number): Promise<Pokemon> {
        const url = `${Config.POKEMON_SERVICE_URL}/${id}`;
        const response = await axios.get(url);
        return Pokemon.mapPokemonData(response.data);
    }
    static async getSpecifict(url: string): Promise<getPokemon> {
        const response = await axios.get(url);
        return response.data
    }
}

