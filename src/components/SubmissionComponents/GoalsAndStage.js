import { useDispatch, useSelector } from "react-redux";//using react-redux
import { updateField } from "@/store/formSlice";//importing the updateField from store
export default function GoalsAndStage({ nextStep, prevStep }) {
  
  const dispatch = useDispatch();
  const { expectedOutcome, currentStage } = useSelector((state) => state.form);
  const handleChange = (e) => {
    dispatch(updateField({ field: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="expectedOutcome" className="block text-sm font-medium">
          Expected Outcome
        </label>
        <textarea
          id="expectedOutcome"
          name="expectedOutcome"
          value={expectedOutcome}
          onChange={handleChange}
          required
          rows="3"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
        ></textarea>
      </div>
      <div>
        <label htmlFor="currentStage" className="block text-sm font-medium">
          Current Stage of the Idea
        </label>
        <select
          id="currentStage"
          name="currentStage"
          value={currentStage}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
        >
          <option value="">Select a stage</option>
          <option value="Idea">Idea</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Demo">Demo</option>
        </select>
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
