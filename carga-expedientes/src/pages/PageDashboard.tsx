import { useState, useEffect } from "react";
import { getExpedientes, addExpediente, deleteExpediente, updateExpediente } from "../ExpedienteManage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BG from "../components/Bg";
import BlueButton from "../components/BlueButton";
import ExpedienteTable from "../components/ExpedienteTable";
import AddExpedienteDialog from "../components/addExpedienteDialog";
import VerExpedienteDialog from "../components/VerExpedienteDialog";
import EditExpedienteDialog from "../components/EditExpedienteDialog";
import Paginador from "../components/Paginador";

function DashboardPage() {
  const [isAddExpedienteOpen, setIsAddExpedienteOpen] = useState(false);
  const [isVerExpedienteOpen, setIsVerExpedienteOpen] = useState(false);
  const [isEditExpedienteOpen, setIsEditExpedienteOpen] = useState(false);

  const [selectedExpediente, setSelectedExpediente] = useState<Expediente | null>({
    CI: 0,
    nombre: "",
    carrera: "",
    profesor: "",
    fechaCreacion: new Date().toISOString(),
    fechaModificacion: new Date().toISOString()
  });
  
  const handleViewExpediente = (expediente: Expediente) => {
    setSelectedExpediente(expediente);
    setIsVerExpedienteOpen(true);
  }

  const handleEditExpediente = (expediente: Expediente) => {
    setSelectedExpediente(expediente);
    setIsEditExpedienteOpen(true);
  }

  const [updatePageCount, setUpdatePageCount] = useState(false);
  const [Page, setPage] = useState(1);
  const [PageSize, setPageSize] = useState(10);
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);
  
  async function AddExpediente(expediente: FormData) {
    await addExpediente(expediente);
    await fetchData();
    setUpdatePageCount(!updatePageCount);
    setIsAddExpedienteOpen(false);
  }

  async function EditExpediente(expediente: FormData, CI: number) {
    if (!CI) {
      console.error("CI is required for updating an expediente.");
      return;
    }
    console.log("Updating expediente with CI:", CI);
    await updateExpediente(expediente, CI);
    await fetchData();
    setUpdatePageCount(!updatePageCount);
    setIsEditExpedienteOpen(false);
  }

  function handleDeleteExpediente(CI: number) {
    if (window.confirm("¿Estás seguro de que quieres eliminar este expediente?")) {
      deleteExpediente(CI)
        .then(() => {
          fetchData();
          setUpdatePageCount(!updatePageCount);
        })
        .catch((error) => {
          console.error("Error al eliminar el expediente:", error);
          alert("Error al eliminar el expediente. Por favor, inténtalo de nuevo.");
        });
    }
  }

  async function fetchData() {
    const data = await getExpedientes(Page, PageSize);
    console.log(data);
    setExpedientes(data);
  }

  useEffect(() => {
    fetchData();
  }, [Page]);



  return (
    <BG>
      <Header />
      <main className="flex flex-col mx-auto px-4 align-middle w-[65%] min-h-[calc(100vh-70px*2)] ">
        <div className="h-full w-full m-5 bg-white p-5 rounded-lg shadow-md flex flex-col gap-4">
          <div className="flex items-center row">
            <Paginador currentPage={Page} setPage={setPage} pageSize={PageSize} updatePageCount={updatePageCount} />
           <div className="flex-1 text-center">
             <div className="overflow-auto">
           <ExpedienteTable expedientes={expedientes} onDelete={handleDeleteExpediente} onView={handleViewExpediente} onEdit={handleEditExpediente} />
          </div>
          <div className="sticky bottom-0 bg-white pt-4">
            <div className="flex justify-center">
              <BlueButton onClick={() => setIsAddExpedienteOpen(true)} >
                Agregar Expediente
              </BlueButton>
            </div>
          </div>
           </div>
          </div>
        </div>
      <AddExpedienteDialog isOpen={isAddExpedienteOpen} setOpen={setIsAddExpedienteOpen} expedientFunction={AddExpediente}/>
      <VerExpedienteDialog isOpen={isVerExpedienteOpen} setOpen={setIsVerExpedienteOpen} expedient={selectedExpediente}/>
      <EditExpedienteDialog isOpen={isEditExpedienteOpen} setOpen={setIsEditExpedienteOpen} expedient={selectedExpediente} expedientFunction={EditExpediente}/>
      </main>
      <Footer />
    </BG>
  );
}

export default DashboardPage;
