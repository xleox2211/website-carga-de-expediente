import Logo from "../assets/logo.png";
import Unefa from "../assets/UNEFA_Letra.png";

function Header() {
  return (
    <header className="bg-stone-200  h-30 min-h-[100px] p-4 flex flex-col sm:flex-row justify-evenly items-center gap-4 text-black font-sans shadow-md">
      <img
        src={Unefa}
        alt="Logo UNEFA"
        className="w-[120px]  sm:w-[160px] md:w-[200px] h-auto object-contain"
      />

      <h1 className="text-base me-10 sm:text-xl md:text-2xl lg:text-3xl text-center px-2 flex-grow max-w-[600px]">
        Sistema de Digitalización de Expedientes (SDE)
      </h1>

      <img
        src={Logo}
        alt="Logo"
        className="w-[60px] sm:w-[80px] h-40 object-contain"
      />
    </header>
  );
}

export default Header;
