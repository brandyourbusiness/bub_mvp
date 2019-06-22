import React from "react";
import { NavItem, NavLink } from 'shards-react';

const axios = require("axios");

export default class Location extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			latitude: null,
			longitude: null, 
			locality: 'Bengaluru'
		}

		this.getLocation = this.getLocation.bind(this);
	}

	componentDidMount() {
		/* Uncomment this line to access current location */
		// this.getLocation();
	}

	getLocation() {
		const loc = window.navigator && window.navigator.geolocation;
		if(loc) {
			loc.getCurrentPosition(position => {
				let coord = position.coords.latitude + "," + position.coords.longitude;
				axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
					params: {
						latlng: coord,
						sensor: true,
						key: process.env.REACT_APP_GMAPS_API_KEY
					}
				})
				.then(({data, status, statusText}) => {
					console.log("RES", data, status)
					if(!data.results[0]) {
						return null;
					}
					let { formatted_address, address_components } = data.results[0];
					this.setState({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						formatted_address,
						locality: address_components.find(add => add.types.find(type => type === 'locality')).short_name
					})
				})
			}, err => {
				alert("Please allow access to your location.")
			})
		}
	}

	render() {
		return (
			<NavItem className="border-right ">
				<NavLink className="nav-link-icon text-center">
					<div className="nav-link-icon__wrapper">
						{
							(this.state.latitude && this.state.longitude) ? 
								<i className="material-icons">location_on</i> : 
								<i className="material-icons">location_off</i>
						}
						<span className="d-none d-md-inline-block"> 
							{this.state.locality} 
						</span>
					</div>
				</NavLink>
			</NavItem>
		)
	}
}