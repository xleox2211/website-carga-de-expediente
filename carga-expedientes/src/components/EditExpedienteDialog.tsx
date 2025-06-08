import FloatDialog from "./FloatDialog"
import BlueButton from "./BlueButton";
import FileList from "./FileList";
import FileListItemEdit from "./FileListItemEdit";
import { getExpedienteFiles } from "../ExpedienteManage";
import { useAuth } from "../userContext";
import { useEffect, useState } from "react";

interface EditExpedienteDialogProps {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    expedient?: Expediente | null;
    expedientFunction?: (as: FormData, CI: number) => void;
}

export default function EditExpedienteDialog({ isOpen, setOpen, expedient, expedientFunction }: EditExpedienteDialogProps){
    const { user } = useAuth();
    const [ErrorMSG, setErrorMSG] = useState("");

    
    // set initial values for the form inputs based on the expedient prop
    useEffect(() => {
        if (expedient) {
            const form = document.querySelector("form");
            console.log("Editing expedient:", expedient);
            if (form) {
                console.log("Setting form values for expedient:", expedient);
                document.getElementById("name")!.setAttribute("value", expedient.nombre);
                document.getElementById("carrera")!.setAttribute("value", expedient.carrera);
            }
            setErrorMSG("");
        }
    }, [expedient]);

    function editExpedient( event: React.FormEvent<HTMLFormElement>){
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
            expedientFunction(formData, expediente.CI);
        }
        setErrorMSG("");
    }

    return (
        <FloatDialog isOpen={isOpen} setOpen={setOpen}>
            <h3 className="font-bold text-lg mb-2">Editar Expediente</h3>
        <form className="flex flex-col gap-2" onSubmit={(e) => {
            editExpedient(e as React.FormEvent<HTMLFormElement>);
        }}>
            <input id="name" name="nombre"  type="text" placeholder="Nombre" className="bg-gray-200 p-3 rounded-md outline-none shadow-inner" />
            <input id="carrera" name="carrera" type="text" placeholder="Carrera" className="bg-gray-200 p-3 rounded-md outline-none shadow-inner" />
            <input type="file" name="files" multiple className="bg-gray-200 p-3 rounded-md outline-none shadow-inner" accept=".png, .jpg, .jpeg, .pdf, .doc, .docx, .sxl, .xlsx" />
            <FileList expedient={expedient} fileItemType={FileListItemEdit} />
            <p className="text-red-300 decoration-0 underline">{ErrorMSG}</p>
            <BlueButton type="submit">Agregar</BlueButton>
        </form>
        </FloatDialog>
    )
}