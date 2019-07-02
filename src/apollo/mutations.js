import { gql } from "apollo-boost";
import { User, Coupon } from "./fragments";

export const UPDATE_USER = gql`
	mutation updateProfile($id: ID!, $input: UserInput) {
		updateUserById(id: $id, input: $input) {
			...User
		}
	}
	${User}
`;

export const CREATE_COUPON_CODE = gql`
	mutation CREATE_COUPON($input: CouponInput) {
		createCoupon(input: $input) {
			...Coupon
		}
	}
	${Coupon}
`;

export const AUTHENTICATED_USER = gql`
	mutation getUserDetails($email: String!, $input: UserInput) {
		getUser(email: $email, input: $input) {
			...User
		}
	}
	${User}
`
