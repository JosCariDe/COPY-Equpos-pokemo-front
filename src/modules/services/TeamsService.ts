import axios from "axios";
import { Config } from "../enviroment/Config";
import { Team } from "../types/Team";

const url = `${Config.BACKEND_SERVICE_URL}/api/equipos`;

export class TeamsServices {
    static async getAll(): Promise<Team[]> {
        const response = await axios.get(url);
        return response.data;
    }

    static async getOne(id: string): Promise<Team> {
        const response = await axios.get(`${url}/${id}`);
        return response.data;
    }

    static async createTeam(body: { nombre: string; pokemonIds: number[]; entrenadorId: string }): Promise<Team> {
        const response = await axios.post(url, body);
        return response.data;
    }

    static async updateTeam(id: string, body: { nombre: string; pokemonIds: number[] }): Promise<Team> {
        const response = await axios.put(`${url}/${id}`, body);
        return response.data;
    }

    static async deleteTeam(id: string): Promise<void> {
        await axios.delete(`${url}/${id}`);
    }
}