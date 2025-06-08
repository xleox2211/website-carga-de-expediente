import { useState } from "react";
import BlueButton from "./BlueButton";
import { useAuth } from "../userContext";
import FloatDialog from "./FloatDialog";

interface ExpedientDialogProps
{
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    expedientFunction?: (as : FormData) => void;
}

function AddExpedienteDialog({isOpen, setOpen, expedientFunction} : ExpedientDialogProps)
{
    const { user } = useAuth();

    const [ErrorMSG, setErrorMSG] = useState("");

    function AddExpediente(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        formData.append("profesor", user.name);
        formData.append("fechaCreacion", new Date().toISOString());
        formData.append("fechaModificacion", new Date().toISOString());

        const files = formData.getAll("files") as File[];
        const expediente: Expediente = {
            CI: Number(formData.get("CI")) as number,
            nombre: formData.get("nombre") as string,
            carrera: formData.get("carrera") as string,
            profesor: user.name,
            fechaCreacion: new Date().toISOString(),
            fechaModificacion: new Date().toISOString(),
        };

        if (files.length === 0 || expediente.CI === 0 || expediente.nombre === "" || expediente.carrera === "")
        {
            setErrorMSG("Por favor, completa todos los campos y selecciona al menos un archivo.");
            return;
        }

        if (files.length > 5)
        {
            setErrorMSG("No se pueden agregar más de 5 archivos.");
            return;
        }


        if (expedientFunction)
        {
            expedientFunction(formData);
        }
        setErrorMSG("");
    }

    return(
    <FloatDialog isOpen={isOpen} setOpen={setOpen}>
        <h3 className="font-bold text-lg mb-2">Agregar Expediente</h3>
        <form className="flex flex-col gap-2" onSubmit={(e) => {
            AddExpediente(e as React.FormEvent<HTMLFormElement>);
        }}>
            <input name="CI"	  type="text" placeholder="CI" className="bg-gray-200 p-3 rounded-md outline-none shadow-inner" />
            <input name="nombre"  type="text" placeholder="Nombre" className="bg-gray-200 p-3 rounded-md outline-none shadow-inner" />
            <input name="carrera" type="text" placeholder="Carrera" className="bg-gray-200 p-3 rounded-md outline-none shadow-inner" />
            <input type="file" name="files" multiple className="bg-gray-200 p-3 rounded-md outline-none shadow-inner" accept=".png, .jpg, .jpeg, .pdf, .doc, .docx, .sxl, .xlsx" />
            <p className="text-red-300 decoration-0 underline">{ErrorMSG}</p>
            <BlueButton type="submit">Agregar</BlueButton>
        </form>
    </FloatDialog>
  )
}

export default AddExpedienteDialog