export class Config {
    public static readonly POKEMON_SERVICE_URL = process.env.NEXT_PUBLIC_POKEMON_SERVICE_URL || "";
    public static readonly BACKEND_SERVICE_URL = process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL || "";
}