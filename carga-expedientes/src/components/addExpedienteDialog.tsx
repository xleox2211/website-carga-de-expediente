import { useState } from "react";
import BlueButton from "./BlueButton";

interface ExpedientDialogProps
{
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    expedientFunction?: (as : Expediente) => void;
}

function AddExpedienteDialog({isOpen, setOpen, expedientFunction} : ExpedientDialogProps)
{
    const [CI, setCI] = useState("");
    const [Name, setName] = useState("");
    const [Prof, setProf] = useState("");
    const [Carr, setCarr] = useState("");

    const [ErrorMSG, setErrorMSG] = useState("");

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        const { id, value } = event.target;

        switch (id)
        {
            case "InCI":
                setCI(value);
                break;
            case "InName":
                setName(value);
                break;
            case "InProf":
                setProf(value);
                break;
            case "InCarr":
                setCarr(value);
                break;
            default:
                break;
        }
    }

    function AddExpediente()
    {
        const Expediente : Expediente = {
            CI: Number(CI),
            nombre: Name,
            profesor: Prof,
            fechaCreacion: new Date().toISOString(),
            fechaModificacion: new Date().toISOString(),
            carrera: Carr
        }

        if (CI === "" || Name === "" || Prof === "" || Carr === "")
        {
            setErrorMSG("Todos los campos son obligatorios.");
            return;
        }

        if (CI.length !== 8)
        {
            setErrorMSG("La CI debe tener 8 dígitos.");
            return;
        }

        if (isNaN(Number(CI)))
        {
            setErrorMSG("La CI debe ser un número válido.");
            return;
        }

        if (expedientFunction)
        {
            expedientFunction(Expediente);
        }
        else
        {
            console.error("No se ha proporcionado una función para manejar el expediente.");
            setErrorMSG("Error al agregar el expediente.");
        }

        setOpen(false);
        setCI("");
        setName("");
        setProf("");
        setCarr("");
        setErrorMSG("");
    }

    if (!isOpen)
    {
        return null
    }

    return(
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm`}>
    <dialog
      id="modal-agregar-expediente"
      className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
      open={true}
    >
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-lg mb-2">Agregar Expediente</h3>
        <input id="InCI" type="text" placeholder="CI" onChange={handleInputChange} className="bg-gray-200 p-3 rounded-md outline-none shadow-inner" />
        <input id="InName" type="text" placeholder="Nombre" onChange={handleInputChange} className="bg-gray-200 p-3 rounded-md outline-none shadow-inner" />
        <input id="InProf" type="text" placeholder="Profesor" onChange={handleInputChange} className="bg-gray-200 p-3 rounded-md outline-none shadow-inner" />
        <input id="InCarr" type="text" placeholder="Carrera" onChange={handleInputChange} className="bg-gray-200 p-3 rounded-md outline-none shadow-inner" />
        <p className="text-red-300 decoration-0 underline">{ErrorMSG}</p>
        <BlueButton onClick={AddExpediente}>Agregar</BlueButton>
      </div>
    </dialog>
  </div>
    )
}

export default AddExpedienteDialog