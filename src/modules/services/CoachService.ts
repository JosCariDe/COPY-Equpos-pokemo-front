import axios from "axios";
import { Config } from "../enviroment/Config";
import { Entrenador } from "../types/Coach";

const url = `${Config.BACKEND_SERVICE_URL}/api/entrenadores`;

export class TrainerServices {
    static async getAll(): Promise<Entrenador[]> {
        const response = await axios.get(url);
        return response.data.entrenadores;
    }

    static async getOne(id: number): Promise<Entrenador> {
        const response = await axios.get(`${url}/${id}`);
        return response.data;
    }
}