import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Title from "./components/Title";


function App() {
  return (
    <div
      className="min-h-screen flex flex-col backgroundStyles"
    >
      <div className="blurEffect"></div>
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center px-4 w-full">
        <Title />
        <Login />
      </main>
      <Footer />
    </div>
  );
}

export default App;
