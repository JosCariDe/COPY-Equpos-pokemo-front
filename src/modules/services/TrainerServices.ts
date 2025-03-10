import axios from "axios";
import { Config } from "../enviroment/Config";
import { trainer } from "../interfaces/trainer";


const url = Config.BACKEND_SERVICE_URL+"api/entrenadores";


export class TrainerServices {
    static async getAll(): Promise<trainer[]> {
        const response = await axios.get(url);
        return response.data.entrenadores;
    }
    static async getOne(id: number): Promise<trainer> {
        const url = `${Config.BACKEND_SERVICE_URL}/${id}`;
        const response = await axios.get(url);
        return response.data;
    }
    static async getSpecifict(url : string) : Promise<trainer>{
        const response = await axios.get(url);
        return response.data
    }
}