import { gql } from 'apollo-boost';

export const User = gql`
	fragment User on User {
		id
		name
		email
		address
		city
		state
		country
		zip_code
		contact
		gst_number
		pan_number
		admin
		verified
		created_at
		updated_at
		__typename
	}
`;