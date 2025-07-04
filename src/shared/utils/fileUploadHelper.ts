import { UPLOAD_PATH } from "@/core/api/upload/path";
import Axios from "@/core/base/Axios";

export interface ResponseUpload {
  id: number;
  fileName: string;
  originalName: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  mimeType: string;
  dimensions: string;
  createdAt: string;
}

export interface ResponseUploads {
  data: ResponseUpload[];
}

export const uploadFileFromQuill = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("files", file);

    // Gọi API trực tiếp như UploadFile component
    const response = await Axios.post<ResponseUploads>(
      UPLOAD_PATH.upload,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data?.data) {
      const uploadResult: ResponseUpload[] = response.data.data;
      const fileData = uploadResult[0];

      return {
        id: fileData.id,
        url: `${import.meta.env.VITE_API_URL_FILE}${fileData.filePath}`,
        fileName: fileData.fileName,
        fileSize: fileData.fileSize,
        fileType: fileData.fileType,
        originalName: fileData.originalName,
      };
    } else {
      console.error("Upload failed - no data in response:", response);
      throw new Error("Upload failed - no data in response");
    }
  } catch (error) {
    console.error("File upload error:", error);
    throw error;
  }
};
