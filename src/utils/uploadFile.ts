import { APPWRITE_BUCKET } from "@/constants";
import { storage } from "@/lib/appwrite";
import { ID } from "appwrite";

export const uploadImageToAppwrite = async (file: File): Promise<string> => {
  try {
    const bucket_id = APPWRITE_BUCKET
    const response = await storage.createFile(bucket_id, ID.unique(), file);

    const fileId = response.$id;
    const url = storage.getFileView(bucket_id, fileId);

    return url.toString();
  } catch (error) {
    console.log("Error uploadImageToAppwrite :: ", error);
    return "";
  }
};
