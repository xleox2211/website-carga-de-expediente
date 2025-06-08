import FileListItem from "./FileListItem";
import React  from "react";

interface FileListProps {
    files: ExpeFile[];
    fileItemType?: React.ComponentType<{ file: ExpeFile, updateFunction?: () => void }>;
    updateFunction?: () => void;
}

export default function FileList({ fileItemType, files, updateFunction }: FileListProps) {


    return (
        <ul className="list-none p-0 flex flex-col items-center gap-2 w-full">
                        {files.map(file => (
                            fileItemType ? (
                                // Render the passed component with the file prop
                                React.createElement(fileItemType, { key: file.id, file, updateFunction })
                            ) : (
                                <FileListItem key={file.id} file={file} />
                            )
                        ))}
                    </ul>
    );
}