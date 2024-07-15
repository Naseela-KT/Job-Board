/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import Select from "react-select";
import { Button } from "@material-tailwind/react";
import { GET_JOBS } from '../utils/mutations';

const JobFilter = ({ onFilter }) => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const { data, loading, error } = useQuery(GET_JOBS);

  useEffect(() => {
    if (data) {
      const uniqueRoles = [...new Set(data.jobs.map(job => job.role))];
      const roleOptions = uniqueRoles.map(role => ({
        value: role,
        label: role,
      }));
      roleOptions.unshift({ value: "", label: "Any" });
      setRoles(roleOptions);
    }
  }, [data]);

  const handleRoleChange = (selectedOption) => {
    setSelectedRole(selectedOption);
  };

  const handleFilter = () => {
    onFilter({
      role: selectedRole ? selectedRole.value : null,
      minSalary: minSalary ? parseInt(minSalary, 10) : null,
      maxSalary: maxSalary ? parseInt(maxSalary, 10) : null,
    });
  };

  if (loading) return <p>Loading roles...</p>;
  if (error) return <p>Error loading roles: {error.message}</p>;

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-blue-gray-50 rounded-md shadow-sm mb-4">
      <div className="w-full md:w-1/3">
        <Select
          options={roles}
          value={selectedRole}
          onChange={handleRoleChange}
          placeholder="Select Role"
          className="w-full"
        />
      </div>
      <div className="w-full md:w-1/3">
        <input
          type="number"
          value={minSalary}
          onChange={(e) => setMinSalary(e.target.value)}
          placeholder="Min Salary"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020F3C]"
        />
      </div>
      <div className="w-full md:w-1/3">
        <input
          type="number"
          value={maxSalary}
          onChange={(e) => setMaxSalary(e.target.value)}
          placeholder="Max Salary"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020F3C]"
        />
      </div>
      <Button onClick={handleFilter} className="bg-[#020F3C] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#030C2E] focus:outline-none focus:ring-2 focus:ring-[#020F3C] focus:ring-opacity-50">
        Filter
      </Button>
    </div>
  );
};

export default JobFilter;
