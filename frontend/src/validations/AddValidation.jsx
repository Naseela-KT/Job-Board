export const validate = (values) => {
  const errors = {};

  if (!values.title.trim()) {
    errors.title = "Title is required";
  }else{
    errors.title=""
  }

  if (!values.role.trim()) {
    errors.role = "Role is required";
  }else{
    errors.role=""
  }

  if (!values.location.trim()) {
    errors.location = "Location is required";
  }else{
    errors.location=""
  }

  if (!values.salary) {
    errors.salary = "Salary is required";
  } else if (isNaN(values.salary)) {
    errors.salary = "Salary must be a number";
  }else{
    errors.salary=""
  }

  return errors;
};
