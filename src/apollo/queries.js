import { gql } from 'apollo-boost';
import {
	User
} from './fragments';

export const GET_ALL_USERS = gql`
	query {
		getAllUsers {
			...User
		}
	}
	${User}
`;

export const RUN_JOBS = gql`
	query runJobs($jobName: [String!], $jobOptions: JSON) {
	  runJobs(job_name: $jobName, job_options: $jobOptions) {
	    job_name
	    job_options
	    job_results
	  }
	}
`;