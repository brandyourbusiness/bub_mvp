import { gql } from 'apollo-boost';
import {
	User,
	Coupon,
	Brand
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

export const IS_AUTH_INITIALIZED = gql`
	query IsAuthInitialized {
		isAuthInitialized @client
	}
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
	query RunJobs($jobName: [String!], $jobOptions: JSON) {
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

export const GET_ALL_COUPONS = gql`
	query {
		getAllCoupons {
			...Coupon
		}
	}
	${Coupon}
`;

export const GET_COUPONS_BY_QUERY = gql`
	query GetCouponsByQuery($condition: CouponQueryInput) {
	 	getCouponByQuery (condition:$condition) {
	 		...Coupon
		} 
	}
	${Coupon}
`;

export const GET_BRANDS_BY_QUERY = gql`
	query GetBrandsByQuery($condition: BrandQueryInput) {
		getBrandByQuery (condition: $condition) {
			...Brand
		}
	}
	${Brand}
`;