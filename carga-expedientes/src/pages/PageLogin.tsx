import Header from "../components/Header";
import Footer from "../components/Footer";
import Login from "../components/Login";
import Title from "../components/Title";
import BG from "../components/Bg";

function LoginPage() {
  return (
    <BG>
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4 w-full">
        <Title />
        <Login />
      </main>
      <Footer />
    </BG>
  );
}

export default LoginPage;
