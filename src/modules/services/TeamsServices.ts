import axios from "axios";
import { Config } from "../enviroment/Config";
import { team, teams } from "../interfaces/teams";


const url = Config.BACKEND_SERVICE_URL + "equipos";


export class TeamsServices {
    static async getAll(): Promise<teams[]> {
        const response = await axios.get(url);
        return response.data.entrenadores;
    }
    static async getOne(id: number): Promise<teams> {
        const urlRequest = `${url}/${id}`;
        const response = await axios.get(urlRequest);
        return response.data;
    }
    static async createTeam(body: team, idEntrenador:number): Promise<team> {
        const response = await axios.post(`${url}/${idEntrenador}`, body);
        return response.data
    }
}