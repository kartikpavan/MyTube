import React from "react";
import { Routes, Route } from "react-router-dom";

import Category from "../components/Category";
import Create from "../components/Create";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import VideoPin from "../components/VideoPin";

const Home = ({ user }) => {
	console.log(user);
	return (
		<div>
			<Navbar user={user} />
			<div className="flex flex-col justify-start gap-8">
				<Category />
			</div>
			<div className="flex w-full justify-center items-center px-4">
				<Routes>
					<Route path="/" element={<Feed />} />
					<Route path="/category/:categoryID" element={<Feed />} />
					<Route path="/create" element={<Create />} />
					<Route path="/videoDetail/:videoID" element={<VideoPin />} />
				</Routes>
			</div>
		</div>
	);
};

export default Home;
