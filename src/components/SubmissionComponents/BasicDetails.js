import { useDispatch, useSelector } from "react-redux"; //importing the react-redux hooks to use the store
import { updateField } from "@/store/formSlice"; // importing thr updateField to modify form data in the store

export default function BasicDetails({ nextStep, prevStep }) {
  const dispatch = useDispatch();
  const { ideaTitle, ideaDescription, ideaCategory } = useSelector(
    (state) => state.form
  );
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
        <label htmlFor="ideaTitle" className="block text-sm font-medium">
          Idea Name
        </label>
        <input
          type="text" //Input type is text
          id="ideaTitle" //Unique id for the input field
          name="ideaTitle" //Name matches the corresponding field
          value={ideaTitle}
          onChange={handleChange} //Update Redux store on change
          required //makes the field mandatory
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
        />
      </div>
      <div>
        <label htmlFor="ideaDescription" className="block text-sm font-medium">
          Idea Description
        </label>
        <textarea
          id="ideaDescription" //Unique id for the input field
          name="ideaDescription" //Name matches the corresponding field
          value={ideaDescription}
          onChange={handleChange} //Update Redux store on change
          required //makes the field mandatory
          rows="3"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
        ></textarea>
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium">
          Category/Domain
        </label>
        <input
          type="text" //Input type is text
          id="ideaCategory" //Unique id for the input field
          name="ideaCategory"
          value={ideaCategory}
          onChange={handleChange} //Update the Redux store on change
          required //makes the field mandatory
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button" //button is set to button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Previous
        </button>
        <button
          type="submit" //button is set to trigger form submission
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Next
        </button>
      </div>
    </form>
  );
}
