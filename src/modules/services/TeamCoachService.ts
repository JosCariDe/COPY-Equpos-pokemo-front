import axios from "axios";
import { Config } from "../enviroment/Config";
import { TeamCoach } from "../types/TeamCoach";

const url = `${Config.BACKEND_SERVICE_URL}/api/equipos-entrenador`;

export class EquipoEntrenadorService {
    static async getAll(): Promise<TeamCoach[]> {
        const response = await axios.get(url);
        return response.data;
    }

    static async getOne(id: string): Promise<TeamCoach> {
        const response = await axios.get(`${url}/${id}`);
        return response.data;
    }

    static async getByEntrenador(entrenadorId: number): Promise<TeamCoach> {
        const response = await axios.get(`${url}/entrenador/${entrenadorId}`);
        return response.data[0];
    }

    static async createEquipoEntrenador(body: { entrenadorId: number; equiposIds: string[]; equipoSeleccionado: string }): Promise<TeamCoach> {
        const response = await axios.post(url, body);
        return response.data;
    }

    static async updateEquipoEntrenador(id: string, body: { entrenadorId: number; equiposIds: string[]; equipoSeleccionado: string }): Promise<TeamCoach> {
        const response = await axios.put(`${url}/${id}`, body);
        return response.data;
    }

    static async deleteEquipoEntrenador(id: string): Promise<void> {
        await axios.delete(`${url}/${id}`);
    }
}