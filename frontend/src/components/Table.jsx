/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  CardBody, Card, Button, Dialog, DialogHeader, DialogBody,
  DialogFooter, CardFooter, Typography
} from '@material-tailwind/react';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { GET_JOBS, DELETE_JOB } from '../utils/mutations';
import JobFilter from './JobFilter';

const TABLE_HEAD = ["Title", "Role", "Location", "Salary", "Actions"];

export function Table() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [filters, setFilters] = useState({ role: null, minSalary: null, maxSalary: null });
  const navigate = useNavigate();
  const location = useLocation();
  
  const { data, loading, error, refetch } = useQuery(GET_JOBS);

  const [deleteJob] = useMutation(DELETE_JOB, {
    onCompleted: () => {
      toast.success("Job deleted successfully!");
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job. Please try again.");
    }
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageParam = queryParams.get("page");
    setPage(pageParam ? parseInt(pageParam, 10) : 1);
  }, [location.search]);

  const handleOpen = (id) => {
    setOpen(!open);
    setDeleteId(id || "");
  };

  useEffect(() => {
    if (data) {
      const totalJobs = data.jobs.length;
      const jobsPerPage = 6; 
      setTotalPages(Math.ceil(totalJobs / jobsPerPage));
    }
    refetch();
  }, [data]);

  const handleFilter = (filterValues) => {
    setFilters(filterValues);
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredJobs = data?.jobs?.filter(job => {
    return (!filters.role || job.role === filters.role) &&
      (!filters.minSalary || job.salary >= filters.minSalary) &&
      (!filters.maxSalary || job.salary <= filters.maxSalary);
  });

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-8 pt-10">
        <div>
          <Typography variant="h4" color="blue-gray">
            Jobs list
          </Typography>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Link to="/add-job">
            <Button className="flex items-center gap-3 bg-[#131b3b]" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Job
            </Button>
          </Link>
        </div>
      </div>

      <JobFilter onFilter={handleFilter} />

      <Card className="h-full w-full overflow-scroll">
        <CardBody>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-purple-100 bg-blue-gray-100 p-4"
                  >
                    <Typography
                      variant="h6"
                      color="black"
                      className="font-bold leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredJobs?.map(({ id, title, role, location, salary }, index) => {
                const isLast = index === filteredJobs.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {title}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {role}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {location}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {salary}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Link to={`/edit-job?id=${id}`}>
                        <Button
                          color="gray"
                          variant="outlined"
                          size="sm"
                          className="hidden lg:inline-block mr-2"
                        >
                          <span>Edit</span>
                        </Button>
                      </Link>
                      <Button
                        color="red"
                        variant="outlined"
                        size="sm"
                        className="hidden lg:inline-block"
                        onClick={() => handleOpen(id)}
                      >
                        <span>Delete</span>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-bold">
            Page {page} of {totalPages}
          </Typography>
          {totalPages > 1 && (
            <div className="flex gap-2">
              <Button
                variant="gradient"
                size="sm"
                onClick={() => {
                  const prevPage = page - 1 > 0 ? page - 1 : 1;
                  navigate(`?page=${prevPage}`);
                }}
              >
                Previous
              </Button>
              <Button
                variant="gradient"
                size="sm"
                onClick={() => {
                  const nextPage =
                    page + 1 <= totalPages ? page + 1 : totalPages;
                  navigate(`?page=${nextPage}`);
                }}
              >
                Next
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>

      <Dialog open={open} handler={() => handleOpen()} size="xs">
        <DialogHeader>Confirm Deletion</DialogHeader>
        <DialogBody>Are you sure you want to delete this job?</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="black"
            onClick={() => handleOpen()}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={() => {
              if (deleteId) {
                deleteJob({ variables: { id: deleteId } });
                handleOpen(); 
              }
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
