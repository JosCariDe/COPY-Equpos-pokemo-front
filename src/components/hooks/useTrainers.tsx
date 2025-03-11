import { useQuery } from "@tanstack/react-query";
import { TrainerServices } from "@/modules/services/CoachService";

const useTrainers = () => {
    return useQuery({
        queryKey: ["trainer", "all"],
        queryFn: TrainerServices.getAll,
    });
};

export default useTrainers;
