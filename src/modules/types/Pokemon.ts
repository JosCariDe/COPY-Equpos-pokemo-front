export interface Pokemon {
    id: number;
    nombre: string;
    tipos: string[];
    nivel: number;
    estadisticas: {
        hp: number;
        ataque: number;
        defensa: number;
        velocidad: number;
    };
    movimientos: string[];
    sprite: string;
}