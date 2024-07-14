/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  CardBody, Card, Button, Dialog, DialogHeader, DialogBody,
  DialogFooter, CardFooter, Typography
} from '@material-tailwind/react';
import { UserPlusIcon } from '@heroicons/react/24/solid';


const GET_JOBS = gql`
  query MyQuery {
    jobs {
      title
      salary
      role
      location
      id
    }
  }
`;

const TABLE_HEAD = ["Title", "Role", "Location", "Salary","Actions"];

export function Table() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Initialize with 1 to avoid undefined
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_JOBS);

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
      console.log("here");
      console.log(data);
      // Assuming we have a total count of jobs to calculate totalPages
      const totalJobs = data.jobs.length;
      const jobsPerPage = 10; // Assuming a fixed number of jobs per page
      setTotalPages(Math.ceil(totalJobs / jobsPerPage));
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
              {data?.jobs?.map(({ id, title, role, location, salary }, index) => {
                const isLast = index === data.jobs.length - 1;
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
                  const nextPage = page - 1 > 0 ? page - 1 : 1;
                  navigate(`?page=${nextPage}`);
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
            // onClick={() => { deleteUser(); handleOpen(); }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
