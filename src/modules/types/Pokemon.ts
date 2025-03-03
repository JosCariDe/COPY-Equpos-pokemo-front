
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
}