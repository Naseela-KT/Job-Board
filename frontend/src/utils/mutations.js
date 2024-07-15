/* eslint-disable no-unused-vars */
import { gql } from "@apollo/client";

//Get-Jobs mutation
export const GET_JOBS = gql`
  query GetJobs {
    jobs {
      title
      salary
      role
      location
      id
    }
  }
`;

// get single job mutation
export const GET_JOB = gql`
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

// add job mutation
export const ADD_JOB = gql`
  mutation InsertJobs(
    $title: String
    $role: String
    $location: String
    $salary: Int
  ) {
    insert_jobs(
      objects: {
        title: $title
        role: $role
        location: $location
        salary: $salary
      }
    ) {
      affected_rows
      returning {
        id
        title
        role
        location
        salary
      }
    }
  }
`;

//update job mutation
export const UPDATE_JOB = gql`
  mutation update_jobs_by_pk($id: uuid!, $object: jobs_set_input!) {
    update_jobs_by_pk(pk_columns: { id: $id }, _set: $object) {
      id
      location
      role
      salary
      title
    }
  }
`;

//delete-job mutation
export const DELETE_JOB = gql`
  mutation delete_jobs_by_pk($id: uuid!) {
    delete_jobs_by_pk(id: $id) {
      id
      title
      role
      location
      salary
    }
  }
`;
