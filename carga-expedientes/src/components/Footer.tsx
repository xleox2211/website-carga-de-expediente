function Footer() {
  return (
    <footer className="bg-blue-500/85 w-full text-black py-3 md:py-4  bottom-0 h-[70px]">
      <div className="container mx-auto px-2">
        <div className="flex flex-col md:flex-row justify-center md:justify-around items-center gap-1 md:gap-4 text-center">
          <p className="text-xs sm:text-sm md:text-base">
            Desarrolladores: Sergio Ricaflor, Leonardo Garcia, Gonzalo Lara, Hebert Torrelles, Naikary Crespo.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
