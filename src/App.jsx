import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

//* util function
import { userAccessToken, fetchUserDetails } from "./utils/fetchUser";

const App = () => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		//* if the access token is not present inside the browser lcoal storage then redirect the user to login page
		//* else if the token is present then fetch the user details from local storage
		const accessToken = userAccessToken();
		if (!accessToken) {
			navigate("/login", { replace: true });
		} else {
			const [userInfo] = fetchUserDetails();
			setUser(userInfo);
		}
	}, []);

	return (
		<Routes>
			<Route path="login" element={<Login />} />
			<Route path="/*" element={<Home user={user} />} />
		</Routes>
	);
};

export default App;
