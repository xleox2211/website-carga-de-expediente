import fs from 'fs';
import path from 'path';

const uploadDir = path.join(__dirname, '../uploads');


if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

async function deleteFile(fileName: string) {
    const filePath = path.join(uploadDir, fileName);
    fs.rm(filePath, { force: true }, (err) => {
        if (err) {
            console.error(`Error deleting file ${fileName}:`, err);
            throw new Error(`Failed to delete file: ${fileName}`);
        }
        console.log(`File ${fileName} deleted successfully.`);
    });
}

export { deleteFile }