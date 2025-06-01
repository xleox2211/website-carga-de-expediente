import { Link } from "react-router-dom";
import { useAuth } from "../userContext";

function Header() {
  const { logout } = useAuth();

  return (
    <header className="bg-white justify-center h-[70px] p-4 flex flex-col sm:flex-row  items-center gap-4 text-black font-sans shadow-md">
      <Link to="/" onClick={logout}>
      <img
        src="UNEFA_Letra.png"
        alt="Logo UNEFA"
        className="w-[120px] sm:w-[160px] md:w-[200px] h-auto object-contain"
      />
      </Link>
    </header>
  );
}

export default Header;
