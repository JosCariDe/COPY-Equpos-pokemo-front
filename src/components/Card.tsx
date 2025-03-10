interface PokemonData {
  name: string;
  img: string;
  imgClassName?: string; // Permite personalizar el tamaño de la imagen
  abilities?: string[]; // Hacer que abilities sea opcional
}

const Card = ({ name, img, imgClassName = "w-full", abilities = [] }: PokemonData) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img
        className={`${imgClassName} object-contain mx-auto`}
        src={img}
        alt={name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
      {abilities.length > 0 && (
        <div className="px-6 pt-4 pb-2">
          {abilities.map((ability, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{ability}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
