import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import { AuthRoute } from "routes";
// Route Views
import BlogOverview from "views/BlogOverview";
import UserProfileLite from "views/UserProfileLite";
import AddNewPost from "views/AddNewPost";
import Errors from "views/Errors";
import ComponentsOverview from "views/ComponentsOverview";
import Tables from "views/Tables";
import BlogPosts from "views/BlogPosts";
import FormContainer from "views/FormContainer";
import HomeComponent from "views/HomeComponent";
import CouponsComponent from "views/CouponsComponent";
import EditBrandsComponent from "views/EditBrands";

const LandingComponent = () => <Redirect to="/home" />;

export const Routes = () => (
	<Switch>
		<Route exact path="/" component={LandingComponent} />
		<Route path="/home" component={HomeComponent} />
		<Route path="/blog-overview" component={BlogOverview} />
		<Route path="/user-profile-lite" component={UserProfileLite} />
		<Route path="/add-new-post" component={AddNewPost} />
		<Route path="/errors" component={Errors} />
		<AuthRoute path="/profile" component={FormContainer} />
		<Route path="/components-overview" component={ComponentsOverview} />
		<Route path="/tables" component={Tables} />
		<Route path="/blog-posts" component={BlogPosts} />
		<AuthRoute path="/coupons" component={CouponsComponent} />
		<AuthRoute path="/edit-brands" component={EditBrandsComponent} />
	</Switch>
);

export default Routes;
