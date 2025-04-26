import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";


function App() {
  return (
    <div
      className="min-h-screen flex flex-col backgroundStyles"
    >
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="bg-white bg-opacity-50 backdrop-blur-sm rounded-xl p-6 shadow-2xl transition-all hover:scale-[1.01] duration-300 w-auto max-w-[90vw] min-w-[200px]">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-700 to-black bg-clip-text text-transparent">
            Sistema de Digitalización de Expedientes de Pasantías
          </h1>
          <p className="text-black text-sm md:text-base text-center">
            (SDEP - Plataforma de gestión documental)
          </p>
        </div>

        <div className="mt-8 w-full max-w-md">
          <Login />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
