import cloudinary from "../Config/cloudinary";
import { createReadStream } from "streamifier";

export const uploadStream = async (req: any) => {
  return new Promise(async (resolve, reject) => {
    let stream = await cloudinary.uploader.upload_stream(
      (err: any, result: any) => {
        if (result) {
          return resolve(result);
        } else {
          return reject(err);
        }
      }
    );
    createReadStream(req.file.buffer).pipe(stream);
  });
};
