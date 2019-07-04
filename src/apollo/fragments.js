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
		image_url
		google_id
		created_at
		updated_at
		__typename
	}
`;

export const Coupon = gql`
	fragment Coupon on Coupon {
		id
		coupon_code
		referrer
		referrer_id
		consumer
		expiry_date
		brand_id
		created_at
		updated_at
		__typename
	}
`;

export const Brand = gql`
	fragment Brand on Brand {
		id
		name
		email
		description
		discount_rate
		category
		sub_category
		address
		city
		state
		country
		zip_code
		contact
		image_url
		verified
		user_id
		created_at
		updated_at
		__typename
	}
`;
