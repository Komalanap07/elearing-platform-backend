import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: "dxjb32pfs", // check in Cloudinary dashboard!
  api_key: "114594897881264",
  api_secret: "1knHQ-dJeOUrx9oWVKZZbXj49hw",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: "courses",
    resource_type: "video", // 👈 important for mp4/mov
    public_id: Date.now() + "-" + file.originalname,
  }),
});

export const upload = multer({ storage });
