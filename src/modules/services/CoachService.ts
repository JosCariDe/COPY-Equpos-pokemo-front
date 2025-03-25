import axios from "axios";
import { Config } from "../enviroment/Config";
import { Entrenador } from "../types/Coach";

const url = `${Config.TRAINERS_SERVICE_URL}/api/trainers`;

export class TrainerServices {
    static async getAll(): Promise<Entrenador[]> {
        const response = await axios.get(url);
        return response.data.trainers;
    }

    static async getOne(id: number): Promise<Entrenador> {
        const response = await axios.get(`${url}/${id}`);
        return response.data;
    }
}
