import multer from "multer";
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Generate unique filename
  },
});
export const upload = multer({ storage });
