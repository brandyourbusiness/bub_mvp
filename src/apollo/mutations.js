import { gql } from 'apollo-boost';
import { User } from './fragments';

export const UPDATE_USER = gql`
	mutation updateProfile($id: ID!, $input: UserInput) {
		updateUser(id: $id, input: $input) {
			...User
		}
	}
	${User}
`;