import { trainer } from "./trainer";

export interface teams {
   entredador:trainer,
   equipos:number[]
}

export interface team {
    nombre: string
    pokemonIds: number[]
}