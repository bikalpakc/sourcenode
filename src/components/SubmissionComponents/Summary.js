import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; //using react-redux
import { updateField } from "../../store/formSlice"; //Import the action to update fields in the Redux store
import { useContract } from "@/hooks/useContract"; //costum hook is used here for submitting idea
export default function Summary({ prevStep }) {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);
  const [hasContributors, setHasContributors] = useState(false);
  const [contributorName, setContributorName] = useState("");
  const { submitIdea } = useContract();

  const handleContributorChange = (e) => {
    setHasContributors(e.target.value === "yes");
  };
  const handleAddContributor = () => {
    if (contributorName.trim()) {
      dispatch(
        updateField({
          field: "contributors",
          value: [...formData.contributors, contributorName.trim()],
        })
      );
      setContributorName("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    submitIdea(formData); //Submit the form data using costumHook and you typically send the data to your backend
  };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Summary</h2>
      <div className="space-y-4">
        <p>
          <strong>Idea Name:</strong> {formData.ideaTitle}
        </p>
        <p>
          <strong>Idea Description:</strong> {formData.ideaDescription}
        </p>
        <p>
          <strong>Category/Domain:</strong> {formData.ideaCategory}
        </p>
        <p>
          <strong>Proof of Concept:</strong> {formData.proofOfConcept}
        </p>

        <div className="mt-4">
          <strong>Supporting Documents:</strong>
          {formData.supportingDocuments.length > 0 ? (
            <div className="mt-2 grid gap-2">
              {formData.supportingDocuments.map((doc) => (
                <div
                  key={doc.id} //unique key for each documnet
                  className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {doc.name}
                      </p>
                      <p className="text-xs text-gray-400">Type: {doc.type}</p>
                    </div>
                  </div>
                  <a
                    href={doc.url} //link to view the document
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-sm text-blue-400 hover:text-blue-300"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <span className="ml-2 text-gray-400">No documents attached</span>
          )}
        </div>
        <p>
          <strong>Expected Outcome:</strong> {formData.expectedOutcome}
        </p>
        <p>
          <strong>Current Stage:</strong> {formData.currentStage}
        </p>
      </div>
      <div className="space-y-4">
        <p>Are there any contributors involved?</p>
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="hasContributors"
              value="yes"
              checked={hasContributors}
              onChange={handleContributorChange} //handle changes to radio button
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="hasContributors"
              value="no"
              checked={!hasContributors} //set to no if none is selected
              onChange={handleContributorChange} //handle changes to radio button
              className="form-radio text-blue-600"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>
      {hasContributors && (
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={contributorName}
              onChange={(e) => setContributorName(e.target.value)}
              placeholder="Contributor name"
              className="flex-grow rounded-md bg-gray-700 border-gray-600 text-white"
            />
            <button
              onClick={handleAddContributor} //add contributor when button is clicked
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          {formData.contributors.length > 0 && (
            <ul className="list-disc list-inside">
              {formData.contributors.map((contributor, index) => (
                <li key={index}>{contributor}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep} //Go to the previous step on click
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit} //submit the form on click
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
