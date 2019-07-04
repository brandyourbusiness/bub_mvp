import { gql } from "apollo-boost";
import { User, Coupon, Brand } from "./fragments";

export const UPDATE_USER_BY_ID = gql`
	mutation UpdateUserById($id: ID!, $input: UserInput) {
		updateUserById(id: $id, input: $input) {
			...User
		}
	}
	${User}
`;

export const CREATE_COUPON_CODE = gql`
	mutation CreateCoupon($input: CouponInput) {
		createCoupon(input: $input) {
			...Coupon
		}
	}
	${Coupon}
`;

export const AUTHENTICATED_USER = gql`
	mutation GetUserDetails($email: String!, $input: UserInput) {
		getUser(email: $email, input: $input) {
			...User
		}
	}
	${User}
`
export const CREATE_BRAND = gql`
	mutation CreateBrand($input: BrandInput) {
		createBrand(input: $input) {
			...Brand
		}
	}
	${Brand}
`;

export const UPDATE_BRAND_BY_ID = gql`
	mutation UpdateBrandById($id: ID!, $input: BrandInput) {
		updateBrandById(id: $id, input: $input) {
			...Brand
		}
	}
	${Brand}
`;
