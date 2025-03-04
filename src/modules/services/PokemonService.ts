import axios from "axios";
import { Config } from "../enviroment/Config";
import { getPokemon } from "../interfaces/pokemon";
import { Pokemon } from "../types/Pokemon";

export class PokemonService {
    static async getAll(): Promise<Pokemon[]> {
        const url = Config.POKEMON_SERVICE_URL;
        const response = await axios.get(url);
        return response.data;
    }
    static async getOne(id: number): Promise<Pokemon> {
        const url = `${Config.POKEMON_SERVICE_URL}/${id}`;
        const response = await axios.get(url);
        return response.data;
    }
    static async getSpecifict(url : string) : Promise<getPokemon>{
        const response = await axios.get(url);
        return response.data
    }
}



/** idealmente hay que devolver un array de pokemons como:
 * {
 *    "id": 1, 
 *    "name": "bulbasaur"
 *    "image": "https://xdofficial-artwork/1.png",
 *    "types": ["grass", "poison"]
 * }
 */