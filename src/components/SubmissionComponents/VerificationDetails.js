import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateField,
  addSupportingDocument,
  removeSupportingDocument,
} from "../../store/formSlice";
import { useFileUpload } from "@/hooks/useFileUpload"; // Import your custom hook for Cloudinary upload

export default function VerificationDetails({ nextStep, prevStep }) {
  const dispatch = useDispatch();
  const { proofOfConcept, supportingDocuments } = useSelector(
    (state) => state.form
  );
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { uploadFile, uploadProgress } = useFileUpload(); // Use the hook

  useEffect(() => {
    // Cleanup function to revoke blob URLs when component unmounts
    return () => {
      selectedFiles.forEach((file) => {
        URL.revokeObjectURL(file.url);
      });
    };
  }, [selectedFiles]);

  const handleChange = (e) => {
    dispatch(updateField({ field: e.target.name, value: e.target.value }));
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    for (const file of files) {
      try {
        // Upload file to Cloudinary
        const uploadedFile = await uploadFile(file);

        if (uploadedFile) {
          // Dispatch action to add new document
          dispatch(
            addSupportingDocument({
              url: uploadedFile.url,
              type: uploadedFile.type,
              name: uploadedFile.name,
            })
          );
          setSelectedFiles((prev) => [...prev, file]);
        }
      } catch (error) {
        console.error("File upload error:", error.message);
      }
    }
  };

  const handleRemoveFile = (documentId) => {
    dispatch(removeSupportingDocument(documentId));
    setSelectedFiles((prev) => prev.filter((file) => file.id !== documentId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="proofOfConcept" className="block text-sm font-medium">
          Proof of Concept
        </label>
        <textarea
          id="proofOfConcept"
          name="proofOfConcept"
          value={proofOfConcept}
          onChange={handleChange}
          required
          rows="3"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
        ></textarea>
      </div>
      <div>
        <label
          htmlFor="supportingDocuments"
          className="block text-sm font-medium"
        >
          Supporting Documents
        </label>
        <input
          type="file"
          id="supportingDocuments"
          name="supportingDocuments"
          multiple
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-400
    file:mr-4 file:py-2 file:px-4
    file:rounded-md file:border-0
    file:text-sm file:font-semibold
    file:bg-blue-600 file:text-white
    hover:file:bg-blue-700"
        />
        {uploadProgress > 0 && (
          <div className="mt-2 text-sm text-blue-500">
            Uploading... {uploadProgress}%
          </div>
        )}
        {supportingDocuments.length > 0 && (
          <div className="mt-4 space-y-2">
            {supportingDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
              >
                <span className="text-sm text-gray-600">{doc.name}</span>
                <button
                  onClick={() => handleRemoveFile(doc.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <p className="mt-2 text-sm text-gray-400">
          Supported files: PDF, DOC, DOCX, JPG, PNG
        </p>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Previous
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Next
        </button>
      </div>
    </form>
  );
}
