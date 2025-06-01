import { useState, useEffect } from "react";
import { getExpedientes, addExpediente, deleteExpediente } from "../ExpedienteManage";
import AuthChecker from "../components/authChecker";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BG from "../components/Bg";
import BlueButton from "../components/BlueButton";
import ExpedienteItem from "../components/expedienteItem";
import AddExpedienteDialog from "../components/addExpedienteDialog";

function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);
  
  function AddExpediente(expediente: Expediente) {
    addExpediente(expediente)
    fetchData();
    setIsOpen(false);
  }

  function handleDeleteExpediente(CI: number) {
    if (window.confirm("¿Estás seguro de que quieres eliminar este expediente?")) {
      deleteExpediente(CI)
        .then(() => {
          fetchData();
        })
        .catch((error) => {
          console.error("Error al eliminar el expediente:", error);
          alert("Error al eliminar el expediente. Por favor, inténtalo de nuevo.");
        });
    }
  }

  async function fetchData() {
    const data = await getExpedientes(1, 10);
    console.log(data);
    setExpedientes(data);
  }

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <BG>
      <Header />
      <AuthChecker />
      <main className="flex flex-col mx-auto px-4 align-middle w-[65%] min-h-[calc(100vh-70px*2)] ">
        <div className="h-full w-full m-5 bg-white p-5 rounded-lg shadow-md flex flex-col gap-4">
          <div className="overflow-auto">
            {" "}
            {/* Contenedor para el scroll */}
            <table className="w-full min-w-[800px]">
              {" "}
              {/* Ancho mínimo para evitar compresión */}
              <thead className="bg-gray-200 sticky top-0 z-10">
                <tr className="h-12">
                  <th className="px-4 text-center">Cedula</th>
                  <th className="px-4 text-center">Alumno</th>
                  <th className="px-4 text-center">Tutor Académico</th>
                  <th className="px-4 text-center">Creado / Modificado</th>
                  <th className="px-4 text-center">Carrera</th>
                  <th className="px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                
                {
                  expedientes.map((expediente, index) => (
                    <ExpedienteItem
                      deleteFunction={handleDeleteExpediente}
                      key={index}
                      {...expediente}
                    />
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className="sticky bottom-0 bg-white pt-4">
            {" "}
            {/* Pie fuera de la tabla */}
            <div className="flex justify-center">
              <BlueButton onClick={() => setIsOpen(true)} >
                Agregar Expediente
              </BlueButton>
            </div>
          </div>
        </div>
      <AddExpedienteDialog isOpen={isOpen} setOpen={setIsOpen} expedientFunction={AddExpediente}/>
      </main>
      <Footer />
    </BG>
  );
}

export default DashboardPage;
