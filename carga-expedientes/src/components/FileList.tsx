import FileListItem from "./FileListItem";

interface FileListProps {
    files: ExpeFile[];
}

export default function FileList({ files }: FileListProps) {

    
    return (
        <ul className="list-none p-0 flex flex-col items-center gap-2 w-full">
                        {files.map(file => (
                            <FileListItem key={file.id} file={file} />
                        ))}
                    </ul>
    );
}