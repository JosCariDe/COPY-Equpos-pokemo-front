
export class Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];

    constructor(id: number, name: string, image: string, types: string[]) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.types = types;
    }

    static mapPokemonData = (data: any): Pokemon => {
        return new Pokemon(
            data.id,
            data.name,
            data.sprites.other["dream_world"].front_default,
            data.types.map((type: any) => type.type.name)
        );
    };
}  