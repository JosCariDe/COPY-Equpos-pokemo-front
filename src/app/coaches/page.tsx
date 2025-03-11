"use client"
import useTrainers from "@/components/hooks/useTrainers";
import LoaderScreen from "@/components/Loaders/LoaderScreen";
import TableReact from "@/components/table";

const Page = () => {
  const { data: trainer, isLoading, error } = useTrainers();

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
      />
    </div>
  );
};

export default Page;
