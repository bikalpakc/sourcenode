import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Allowed file types
const ALLOWED_FILE_TYPES = [
  "application/pdf", // PDF
  "application/msword", // DOC
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
  "application/vnd.oasis.opendocument.text", // ODT
  "application/rtf", // RTF
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function useFileUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);

  const validateFile = (file) => {
    if (!file) {
      throw new Error("No file selected");
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      throw new Error(
        "Invalid file type. Only PDF and document files are allowed."
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File size exceeds 10MB limit.");
    }

    return true;
  };

  const uploadFile = async (file) => {
    try {
      validateFile(file);

      const formData = new FormData();
      formData.append("file", file);

      // Call the API route that handles Cloudinary uploads
      const response = await axios.post("/api/v1/upload-files", formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 && response.data.success) {
        const { fileUrl, resourceType } = response.data;

        toast.success("File uploaded successfully");

        return {
          name: file.name,
          url: fileUrl,
          type: resourceType,
        };
      } else {
        throw new Error(response.data.error || "Failed to upload file");
      }
    } catch (error) {
      console.error("File upload failed:", error.message);
      toast.error(error.message || "Failed to upload file");
      return null;
    } finally {
      setUploadProgress(0);
    }
  };

  return {
    uploadFile,
    uploadProgress,
    allowedTypes: ALLOWED_FILE_TYPES,
    maxFileSize: MAX_FILE_SIZE,
  };
}
