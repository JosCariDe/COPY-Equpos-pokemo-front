"use client"
import LoaderScreen from "@/components/Loaders/LoaderScreen";
import TableReact from "@/components/table";
import { TrainerServices } from "@/modules/services/TrainerServices";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  const {
    data: trainer,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trainer", "all"],
    queryFn: TrainerServices.getAll,
  });

  if (isLoading) return <LoaderScreen />;
  
  if (error) 
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500 text-lg font-semibold">
          Ocurrió un error al cargar los entrenadores. Inténtalo de nuevo más tarde.
        </p>
      </div>
    );

  return (
    <div className="h-full w-full">
      <TableReact
        data={trainer || []}
        tableName="Entrenadores"
        gestionTeams={true}
      />
    </div>
  );
};

export default Page;
