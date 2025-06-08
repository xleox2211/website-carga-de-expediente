import Header from "../components/Header";
import Footer from "../components/Footer";
import BG from "../components/Bg";

function UserManagePage() {

  return (
    <BG>
      <Header />
      <main className="flex flex-col mx-auto px-4 align-middle w-[65%] min-h-[calc(100vh-70px*2)] ">
        <h1>Administradores XD</h1>
      </main>
      <Footer />
    </BG>
  );
}

export default UserManagePage;
