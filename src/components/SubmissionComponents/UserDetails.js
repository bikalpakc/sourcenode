import { useDispatch, useSelector } from "react-redux";//import react redux for necessary functions
import { updateField } from "@/store/formSlice";//updating the action from redux store
export default function UserDetails({ nextStep }) {
  const dispatch = useDispatch();
  const { ideaOwner, contactEmail } = useSelector((state) => state.form);
  const handleChange = (e) => {//handles the change in the input
    dispatch(updateField({ field: e.target.name, value: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();//handles form submission
    nextStep();
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="ideaName" className="block text-sm font-medium">
          Idea Owner
        </label>
        <input
          type="text"//specifies input type as text
          id="ideaOwner"//id of the input field
          name="ideaOwner"//name attribute for form binding
          value={ideaOwner}//value bound to redux store
          onChange={handleChange}//calls the handleChange when input field is changed
          required//makes the input field to be compulsory
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
        />
      </div>
      <div>
        <label htmlFor="ideaDescription" className="block text-sm font-medium">
          Idea Email
        </label>
        <input
          type="email"//specifeis input type as email
          id="contactEmail"//id of the input field
          name="contactEmail"//name attribute for form binding
          value={contactEmail}//value bound to redux store
          onChange={handleChange}//calls the handleChange when input field is changed
          required//makes the input field mandatory
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"//the button type is submit
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Next
        </button>
      </div>
    </form>
  );
}
