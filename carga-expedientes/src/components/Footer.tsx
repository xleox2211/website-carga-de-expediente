function Footer() {
  return (
    <footer className="bg-blue-500/85 w-full text-black py-3 md:py-4  bottom-0">
      <div className="container mx-auto px-2">
        <div className="flex flex-col md:flex-row justify-center md:justify-around items-center gap-1 md:gap-4 text-center">
          <p className="text-xs sm:text-sm md:text-base">
            &copy; 2025 Sistema de Digitalización de Expedientes (SDE). Todos
            los derechos reservados.
          </p>
          <p className="text-xs sm:text-sm md:text-base">
            &copy; Universidad Nacional Experimental Politécnica de la Fuerza
            Armada Nacional Bolivariana.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
