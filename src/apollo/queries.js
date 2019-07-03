import { gql } from 'apollo-boost';
import {
	User
} from './fragments';

export const IS_AUTHENTICATED = gql`
	query IsUserAuthenticated {
		isAuthenticated @client
		authUser @client {
			...User
		}
	}
	${User}
`;

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

export const GET_ALL_FORMS = gql`
	query {
		getAllFormsList {
			list
		}
	}
`;