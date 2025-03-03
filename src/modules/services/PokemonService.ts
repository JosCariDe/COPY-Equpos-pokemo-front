import { Config } from "../enviroment/Config";

export class PokemonService {
    static async getAll(): Promise<any> {
        const url = Config.POKEMON_SERVICE_URL;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
}