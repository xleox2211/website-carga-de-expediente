import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
function App() {
  return (
    <>
      <main className="flex flex-col min-h-screen bg-gray-100">
        <Header />

        <Login />
        <Footer />
      </main>
    </>
  );
}

export default App;
