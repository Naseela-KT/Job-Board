/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation, gql } from '@apollo/client';
import { validate } from "../validations/AddValidation";
import toast from "react-hot-toast";


// Define GraphQL queries and mutations
const GET_JOB = gql`
  query jobs_by_pk($id: uuid!) {
    jobs_by_pk(id: $id) {
      id
      location
      role
      salary
      title
    }
  }
`;

const UPDATE_JOB = gql`
  mutation update_jobs_by_pk($id: uuid!, $object: jobs_set_input!) {
    update_jobs_by_pk(pk_columns: {id: $id}, _set: $object) {
      id
      location
      role
      salary
      title
    }
  }
`;


const initialValues = {
  title: "",
  role: "",
  location: "",
  salary: "",
};

const EditJob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [formError, setFormError] = useState("");

  // Extract job ID from query parameters
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const { loading: queryLoading, error: queryError, data } = useQuery(GET_JOB, {
    variables: { id },
    skip: !id, // Skip the query if ID is not present
  });

  useEffect(() => {
    if (data?.jobs_by_pk) {
      setFormValues({
        title: data.jobs_by_pk.title,
        role: data.jobs_by_pk.role,
        location: data.jobs_by_pk.location,
        salary: data.jobs_by_pk.salary,
      });
    }
    // Log data to inspect
    console.log("Query Data:", data);
  }, [data]);

  useEffect(() => {
    console.log("Extracted ID:", id);
  }, [id]);

  // Mutation to update job details
  const [updateJob, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_JOB, {
    onCompleted: () => {
      setFormValues(initialValues); // Clear form fields after successful submission
      toast.success("Job updated successfully!")
      navigate("/"); // Redirect after successful update
    },
    onError: (error) => {
      console.error("Error updating job:", error);
      setFormError("Error updating job. Please try again.");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    const errors = validate({ ...formValues, [name]: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, ...errors }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError(""); // Clear any previous errors
  
    // Validate form values
    const errors = validate(formValues);
    setFormErrors(errors);
  
    if (Object.values(errors).every((error) => error === "")) {
      updateJob({
        variables: {
          id,
          object: {
            title: formValues.title,
            role: formValues.role,
            location: formValues.location,
            salary: parseInt(formValues.salary, 10), // Ensure salary is an integer
          },
        },
      });
    }
  };
  

  if (queryLoading) return <p>Loading...</p>;


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-5">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Job</h2>
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
