/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { validate } from "../validations/AddValidation";

const initialValues = {
  title: "",
  role: "",
  location: "",
  salary: null,
};


const AddJob = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [formError, setFormError] = useState(""); // State to handle form errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // const errors = validate({ ...formValues, [name]: value });
    // setFormErrors((prevErrors) => ({ ...prevErrors, ...errors }));
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setFormError("");
  //   const errors = validate(formValues);
  //   setFormErrors(errors);
  //   console.log(Object.values(errors));
  //   if (Object.values(errors).every((error) => error === "")) {
  //   try {
  //     const response = await userApiRequest(
  //       {
  //         method: "post",
  //         url: `/add`,
  //         data: formValues,
  //       },
  //       { withCredentials: true }
  //     );
  //     console.log("User added:", response.data);
  //     navigate("/");

  //   } catch (error) {
  //     console.error("Error adding user:", error);
  //     setFormError(error.response.data.message)
  //   }
  // }};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-5">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Add Job</h2>
        <form>
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
          </div>
          {formErrors.title ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: 10, marginTop: -10 }}
            >
              {formErrors.title}
            </p>
          ) : null}
          <div className="mb-4">
            <label
              htmlFor="text"
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
          </div>
          {formErrors.role ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: 10, marginTop: -10 }}
            >
              {formErrors.role}
            </p>
          ) : null}
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-gray-700 font-medium mb-2"
            >
              Location
            </label>
            <input
              name="role"
              type="text"
              id="role"
              value={formValues.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020F3C]"
              placeholder="Enter location"
            />
          </div>
          {formErrors.location ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: 10, marginTop: -10 }}
            >
              {formErrors.location}
            </p>
          ) : null}

          <div className="mb-4">
            <label
              htmlFor="email"
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
          </div>
          {formErrors.role ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: 10, marginTop: -10 }}
            >
              {formErrors.role}
            </p>
          ) : null}


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
