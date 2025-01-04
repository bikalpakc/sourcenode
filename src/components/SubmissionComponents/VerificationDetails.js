import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateField,
  addSupportingDocument,
  removeSupportingDocument,
  updateSupportingDocument,
} from "../../store/formSlice";

export default function VerificationDetails({ nextStep, prevStep }) {
  const dispatch = useDispatch();
  const { proofOfConcept, supportingDocuments } = useSelector(
    (state) => state.form
  );
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    // Cleanup function to revoke blob URLs when component unmounts
    return () => {
      supportingDocuments.forEach((doc) => {
        if (doc.url.startsWith("blob:")) {
          URL.revokeObjectURL(doc.url);
        }
      });
    };
  }, [supportingDocuments]);

  const handleChange = (e) => {
    dispatch(updateField({ field: e.target.name, value: e.target.value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      // Create blob URL for the file
      const blobUrl = URL.createObjectURL(file);

      // Get file extension
      const fileType = file.name.split(".").pop().toLowerCase();

      // Dispatch action to add new document
      dispatch(
        addSupportingDocument({
          url: blobUrl,
          type: fileType,
          name: file.name,
        })
      );
    });

    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (documentId) => {
    dispatch(removeSupportingDocument(documentId));
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
