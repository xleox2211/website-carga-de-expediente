import FloatDialog from "./FloatDialog";
import { useEffect, useState } from "react";
import { getExpedienteFiles } from "../ExpedienteManage";
import FileList from "./FileList";

interface VerExpedienteDialogProps {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    expedient?: Expediente | null;
}

export default function VerExpedienteDialog({ isOpen, setOpen, expedient }: VerExpedienteDialogProps) {
    const [files, setFiles] = useState<ExpeFile[]>([]);


    useEffect(() => {
        if (isOpen && expedient) {
            getFiles();
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

    return (
        <FloatDialog isOpen={isOpen} setOpen={setOpen}>
            <h2>Detalles del Expediente</h2>
            {expedient ? (
                <div className="flex flex-col gap-2">
                    <p><strong>CI:</strong> {expedient.CI}</p>
                    <p><strong>Nombre:</strong> {expedient.nombre}</p>
                    <p><strong>Carrera:</strong> {expedient.carrera}</p>
                    <p><strong>Tutor Academico:</strong> {expedient.profesor}</p>
                    <p><strong>Fecha de Creación:</strong> {new Date(expedient.fechaCreacion).toLocaleDateString()}</p>
                    <p><strong>Fecha de Modificación:</strong> {new Date(expedient.fechaModificacion).toLocaleDateString()}</p>
                    <p><strong>Archivos Adjuntos:</strong></p>
                    <FileList files={files} />
                </div>
            ) : (
                <p>No hay información del expediente disponible.</p>
            )}
        </FloatDialog>
    );
}