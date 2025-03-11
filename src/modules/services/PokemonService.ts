import axios from "axios";
import { Config } from "../enviroment/Config";
import { Pokemon } from "../types/Pokemon";

const url = `${Config.BACKEND_SERVICE_URL}/api/pokemon`;

export class PokemonService {
    static async getAll(): Promise<Pokemon[]> {
        const response = await axios.get(url);
        return response.data.pokemones;
    }

    static async getOne(id: number): Promise<Pokemon> {
        const response = await axios.get(`${url}/${id}`);
        return response.data;
    }
}