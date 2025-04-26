import GenericBox from "./GenericBox"

function Title() {
  return (
        <GenericBox styles="transition-all hover:scale-[1.01] duration-300 min-w-[200px] mt-8 mb-[-25px]">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 bg-gradient-to-b from-blue-700 to-black bg-clip-text text-transparent text-center">
            Sistema de Digitalización de Expedientes de Practicas Profesionales
          </h1>
          <p className="text-gray-600 text-sm md:text-base text-center">
            (SDEPP - Plataforma de gestión documental)
          </p>
        </GenericBox>
  );
}

export default Title;