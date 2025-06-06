import { getImageUrl, DownloadFile } from "../FileManage";

interface FileListItemProps {
    file: ExpeFile;
}

export default function FileListItem({ file }: FileListItemProps) {

    function reduceFileName(fileName: string): string {
            const maxLength = 30; // Maximum length of the file name
            if (fileName.length <= maxLength) {
                //remove the extension 
                const notExtension = fileName.split('.').slice(0, -1).join('.');
                return notExtension;
            }
            const extension = fileName.split('.').pop() || '';
            const baseName = fileName.slice(0, maxLength - extension.length - 3); // Leave space for '...'
            return `${baseName}...`;
        }

    function handleClick()
    {
        if (file.fileExtension === ".png" || file.fileExtension === ".jpg" || file.fileExtension === ".jpeg" || file.fileExtension === ".webp") {
            window.open(getImageUrl(file.id), "_blank");
        }

        else {
            DownloadFile(file.id)
                .then(blob => {
                    if(file.fileExtension === ".pdf") {
                        const url = window.URL.createObjectURL(blob);
                        window.open(url, "_blank");
                        return;
                    }
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = file.originalName;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                })
                .catch(error => {
                    console.error("Error downloading file:", error);
                });
        }
    }

    return (
        <li
        onClick={handleClick}
         className="flex items-center gap-2 p-2 border-b bg-gray-200 shadow-md border-gray-200 w-full
          rounded-sm hover:bg-gray-300 hover:shadow-lg hover:scale-105 transition-all duration-150">
            {
                file.fileExtension === ".png" ||
                file.fileExtension === ".jpg" ||
                file.fileExtension === ".jpeg" ||
                file.fileExtension === ".webp" ? (
                    <img src={getImageUrl(file.id)} alt={file.originalName} className="w-10 h-10 object-cover" />
                )
                : (
                    <img src={`icons/${file.fileExtension.toLowerCase()}.png`} className="w-10 h-10 object-cover" />
                )
            }
            <div className="flex flex-col">
                <span className="font-semibold">{reduceFileName(file.originalName)}</span>
                <span className="text-sm text-gray-500">{file.fileSize} bytes</span>
            </div>
        </li>
    );
}