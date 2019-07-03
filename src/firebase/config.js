import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

import { AUTHENTICATED_USER } from "apollo/mutations";

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};
if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

const auth = firebase.auth();

export const initFirebaseUser = client => {
	client.writeData({
		data: {
			isAuthInitialized: true
		}
	});
	auth.onAuthStateChanged(user => {
		const isAuthenticated = user != null;
		if (isAuthenticated) {
			user = user.toJSON();
			// 1. Get the token from firebase
			let accessToken = user.stsTokenManager.accessToken;
			// 2. Set token to sessionStorage
			setToken(accessToken);
			// 3. Check for the user in local database
			return getAuthenticatedUser(client, user);
		} else {
			setToken("");
			client.resetStore();
		}
	});
};

export const googleSignin = () => {
	let provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope("https://www.googleapis.com/auth/plus.login");
	return auth.signInWithPopup(provider);
};

export const googleSignout = () => {
	return auth.signOut();
};

export const setToken = accessToken => {
	window.sessionStorage.setItem("token", accessToken);
};

export const getToken = accessToken => {
	return window.sessionStorage.getItem("token");
};

export const getAuthenticatedUser = (client, user) => {
	return client
		.mutate({
			mutation: AUTHENTICATED_USER,
			variables: {
				email: user.email,
				input: {
					name: user.displayName,
					image_url: user.photoURL,
					contact: user.phoneNumber
				}
			}
		})
		.then(({ data: { getUser } }) => {
			return client.writeData({
				data: {
					authUser: getUser,
					isAuthenticated: true,
					isAuthInitialized: false
				}
			});
		});
};
