// src/queries.js
import { gql } from '@apollo/client';

// Query to fetch job details by ID
export const GET_JOB = gql`
  query GetJobs($id: ID!) {
    jobs_by_pk(id: $id) {
      id
      location
      role
      salary
      title
    }
  }
`;

// Mutation to update job details
export const UPDATE_JOB = gql`
  mutation UpdateJob(
    $id: ID!,
    $title: String,
    $role: String,
    $location: String,
    $salary: Int
  ) {
    update_jobs_many(
      updates: {
        where: {
          id: { _eq: $id }
        },
        set: {
          title: $title,
          role: $role,
          location: $location,
          salary: $salary
        }
      }
    ) {
      affected_rows
    }
  }
`;
