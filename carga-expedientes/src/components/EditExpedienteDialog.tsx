import FloatDialog from "./FloatDialog"
import BlueButton from "./BlueButton";
import FileList from "./FileList";
import FileListItemEdit from "./FileListItemEdit";
import { getExpedienteFiles } from "../ExpedienteManage";
import { useAuth } from "../userContext";
import { useEffect, useState, useRef } from "react";

interface EditExpedienteDialogProps {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    expedient?: Expediente | null;
    expedientFunction?: (as: FormData, CI: number) => void;
}

export default function EditExpedienteDialog({ isOpen, setOpen, expedient, expedientFunction }: EditExpedienteDialogProps){
    const { user } = useAuth();
    const [ErrorMSG, setErrorMSG] = useState("");
    const [files, setFiles] = useState<ExpeFile[]>([]);

    const nameInputRef = useRef<HTMLInputElement>(null);
    const carreraInputRef = useRef<HTMLInputElement>(null);
    const inputFileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && expedient) {
            if (inputFileRef.current) {
                inputFileRef.current.value = ""; // Clear the file input
            }
            getFiles();
            nameInputRef.current?.focus();
            if (nameInputRef.current) {
                nameInputRef.current.value = expedient.nombre;
            }
            if (carreraInputRef.current) {
                carreraInputRef.current.value = expedient.carrera;
            }
        }
    }, [isOpen, expedient]);

    function getFiles()
    {
        console.log("Fetching files for expedient with CI:", expedient?.CI);
        if (expedient?.CI) {
            getExpedienteFiles(expedient.CI)
                .then(_files => {
                    setFiles(_files);
                })
                .catch(error => {
                    console.error("Error fetching files:", error);
                });
        } else {
            console.warn("No CI provided for expedient.");
        }
    }

    function editExpedient( event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        formData.append("profesor", user.name);
        formData.append("CI", expedient?.CI.toString() || "0");
        formData.append("fechaCreacion", expedient?.fechaCreacion || new Date().toISOString());
        formData.append("fechaModificacion", new Date().toISOString());

        const files = formData.getAll("files") as File[];
        console.log("Files to be added:", files);
        const Newexpediente: Expediente = {
            CI: Number(expedient?.CI) as number,
            nombre: formData.get("nombre") as string,
            carrera: formData.get("carrera") as string,
            profesor: user.name,
            fechaCreacion: new Date().toISOString(),
            fechaModificacion: new Date().toISOString(),
        };

        if (files.length === 0 || Newexpediente.CI === 0 || Newexpediente.nombre === "" || Newexpediente.carrera === "")
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
            expedientFunction(formData, Newexpediente.CI);
            console.log("Expediente edited successfully:", Newexpediente);
        }
        setErrorMSG("");
    }

    return (
        <FloatDialog isOpen={isOpen} setOpen={setOpen}>
            <h3 className="font-bold text-lg mb-2">Editar Expediente</h3>
        <form className="flex flex-col gap-2" onSubmit={(e) => {
            editExpedient(e as React.FormEvent<HTMLFormElement>);
        }}>
            <input id="name" name="nombre" ref={nameInputRef} type="text" placeholder="Nombre" className="bg-gray-200 p-3 rounded-md outline-none shadow-inner" />
            <input id="carrera" name="carrera" ref={carreraInputRef} type="text" placeholder="Carrera" className="bg-gray-200 p-3 rounded-md outline-none shadow-inner" />
            <input type="file" name="files" multiple ref={inputFileRef} className="bg-gray-200 p-3 rounded-md outline-none shadow-inner" accept=".png, .jpg, .jpeg, .pdf, .doc, .docx, .sxl, .xlsx" />
            <FileList files={files} fileItemType={FileListItemEdit} updateFunction={getFiles}/>
            <p className="text-red-300 decoration-0 underline">{ErrorMSG}</p>
            <BlueButton type="submit">Editar</BlueButton>
        </form>
        </FloatDialog>
    )
}