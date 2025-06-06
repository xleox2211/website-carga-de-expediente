import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const decodedFileName = Buffer.from(file.originalname, 'binary').toString('utf8');
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(decodedFileName);
        const baseName = path.basename(decodedFileName, ext);
        // only allow extensions .jpg, .jpeg, .png, .webp, .docx, .pdf, .doc, .xls, .xlsx
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.docx', '.pdf', '.doc', '.xls', '.xlsx'];
        if (!allowedExtensions.includes(ext)) {
            return cb(new Error('Invalid file type'), '');
        }
        cb(null, baseName + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage: storage });

export default upload;
