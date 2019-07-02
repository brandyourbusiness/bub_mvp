import React from "react";
import { Link } from "react-router-dom";
import { Query, withApollo } from "react-apollo";
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Collapse,
	NavItem,
	NavLink
} from "shards-react";
import { Loading } from 'components';
import { googleSignin, googleSignout } from "firebase/config"
import { IS_AUTHENTICATED } from "apollo/queries";

class UserActions extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			awaitUserStatus: true
		};

		this.toggleUserActions = this.toggleUserActions.bind(this);
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				awaitUserStatus: false
			})
		}, 3000)
	}

	toggleUserActions() {
		this.setState({
			visible: !this.state.visible
		});
	}

	appLogin = () => {
		googleSignin();
	}

	appLogout = () => {
		googleSignout();
	}

	awaitForUser = () => (
		<NavItem className="border-right">
			<NavLink
				className="nav-link-icon text-center"
				style={{width: "125px" }}
			>
				<Loading />
			</NavLink>
		</NavItem>			
	)

	render =() => (
		<Query query={IS_AUTHENTICATED}>
		{
			({data: { isAuthenticated, authUser }, loading }) => {
				if (this.state.awaitUserStatus) {
					return this.awaitForUser();
				} else {
					if (!isAuthenticated) {
						return (
							<NavItem className="border-right">
								<NavLink
									className="nav-link-icon text-center text-info my-2"
									style={{ cursor: "pointer", width: "125px" }}
									onClick={this.appLogin}
								> {/*
									<span>
										<i className="material-icons">&#xE879;</i> 
									</span> */}
									<b>Google Signin</b>
								</NavLink>
							</NavItem>
						);
					}
					return (
						<NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
							<DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
								<img
									className="user-avatar rounded-circle mr-2"
									src={authUser.image_url}
									alt="User Avatar"
								/>{" "}
								<span className="d-none d-md-inline-block">{authUser.name}</span>
							</DropdownToggle>
							<Collapse tag={DropdownMenu} right small open={this.state.visible}>
								<DropdownItem tag={Link} to="user-profile">
									<i className="material-icons">&#xE7FD;</i> Profile
								</DropdownItem>
								<DropdownItem tag={Link} to="edit-user-profile">
									<i className="material-icons">&#xE8B8;</i> Edit Profile
								</DropdownItem>
								<DropdownItem tag={Link} to="file-manager-list">
									<i className="material-icons">&#xE2C7;</i> Files
								</DropdownItem>
								<DropdownItem tag={Link} to="transaction-history">
									<i className="material-icons">&#xE896;</i> Transactions
								</DropdownItem>
								<DropdownItem divider />
								<DropdownItem tag={Link} to="/" className="text-danger" onClick={this.appLogout}>
									<i className="material-icons text-danger">&#xE879;</i> Logout
								</DropdownItem>
							</Collapse>
						</NavItem>
					);
				}
			}
		}
		</Query>
	)
}

export default withApollo(UserActions);