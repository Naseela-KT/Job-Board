/* eslint-disable no-unused-vars */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { validate } from "../validations/AddValidation";
import toast from "react-hot-toast";
import { ADD_JOB } from "../utils/mutations";

// Initial values for the form
const initialValues = {
  title: "",
  role: "",
  location: "",
  salary: "",
};



const AddJob = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [formError, setFormError] = useState(""); 
  const navigate = useNavigate();
  const [addJob, { error: mutationError }] = useMutation(ADD_JOB);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: name === 'salary' ? parseFloat(value) : value });
    const errors = validate({ ...formValues, [name]: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, ...errors }));
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.values(errors).every((error) => error === "")) {
      try {
        const { data } = await addJob({ variables: { ...formValues, salary: parseFloat(formValues.salary) } });
        console.log("Job added:", data);
        toast.success("Job added!")
        navigate("/");
      } catch (error) {
        console.error("Error adding job:", error);
        setFormError("Failed to add job. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-5">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Add Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Title
            </label>
            <input
              name="title"
              type="text"
              id="title"
              value={formValues.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020F3C]"
              placeholder="Enter title"
            />
            {formErrors.title && (
              <p className="text-sm text-red-500 mb-4">{formErrors.title}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-gray-700 font-medium mb-2"
            >
              Role
            </label>
            <input
              name="role"
              type="text"
              id="role"
              value={formValues.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020F3C]"
              placeholder="Enter role"
            />
            {formErrors.role && (
              <p className="text-sm text-red-500 mb-4">{formErrors.role}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-gray-700 font-medium mb-2"
            >
              Location
            </label>
            <input
              name="location"
              type="text"
              id="location"
              value={formValues.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020F3C]"
              placeholder="Enter location"
            />
            {formErrors.location && (
              <p className="text-sm text-red-500 mb-4">{formErrors.location}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="salary"
              className="block text-gray-700 font-medium mb-2"
            >
              Salary
            </label>
            <input
              name="salary"
              type="number"
              id="salary"
              value={formValues.salary}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020F3C]"
              placeholder="Enter salary"
            />
            {formErrors.salary && (
              <p className="text-sm text-red-500 mb-4">{formErrors.salary}</p>
            )}
          </div>

          {formError && (
            <p className="text-red-500 text-sm mb-4">{formError}</p>
          )}
          <button
            type="submit"
            className="w-full bg-[#020F3C] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#030C2E] focus:outline-none focus:ring-2 focus:ring-[#020F3C] focus:ring-opacity-50"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
