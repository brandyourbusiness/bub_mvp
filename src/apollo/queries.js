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