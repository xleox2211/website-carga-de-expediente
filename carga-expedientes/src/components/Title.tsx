import GenericBox from "./GenericBox"

function Title() {
  return (
        <GenericBox styles="transition-all hover:scale-[1.01] duration-300 min-w-[200px] mt-8 mb-[-25px]">
            <div className="container mx-auto flex flex-col items-center justify-center mb-4 p-4 text-white relative">
  <div className="absolute left-0 top-0 h-full w-1 rounded-2xl bg-gradient-to-b from-blue-700 to-black"></div>
  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 bg-gradient-to-b from-blue-700 to-black bg-clip-text text-transparent text-center">
              Sistema de Digitalización de Expedientes de Practicas Profesionales
            </h1>
</div>
          <p className="text-gray-600 text-sm md:text-base text-center">
            (SDEPP - Plataforma de gestión documental)
          </p>
        </GenericBox>
  );
}

export default Title;