import FileListItem from "./FileListItem";
import { getExpedienteFiles } from "../ExpedienteManage";
import React  from "react";

interface FileListProps {
    expedient?: Expediente | null;
    fileItemType?: React.ComponentType<{ file: ExpeFile }>;
}

export default function FileList({ expedient, fileItemType }: FileListProps) {
    const [files, setFiles] = React.useState<ExpeFile[]>([]);

    React.useEffect(() => {
        if (expedient) {
            (async () => {
                const files = await getExpedienteFiles(expedient.CI);
                setFiles(files);
            })();
        }
    }, [expedient]);

    return (
        <ul className="list-none p-0 flex flex-col items-center gap-2 w-full">
                        {files.map(file => (
                            fileItemType ? (
                                // Render the passed component with the file prop
                                React.createElement(fileItemType, { key: file.id, file })
                            ) : (
                                <FileListItem key={file.id} file={file} />
                            )
                        ))}
                    </ul>
    );
}