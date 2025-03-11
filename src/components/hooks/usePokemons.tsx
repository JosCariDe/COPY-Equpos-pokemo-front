import { useQuery } from "@tanstack/react-query";
import { PokemonService } from "@/modules/services/PokemonService";

const usePokemons = () => {
    return useQuery({
        queryKey: ["pokemon", "all"],
        queryFn: PokemonService.getAll,
    });
};

export default usePokemons;
