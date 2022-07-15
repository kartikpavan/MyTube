import React from "react";
import { Routes, Route } from "react-router-dom";
import { categories } from "../data";

import Category from "../components/Category";
import Create from "../components/Create";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import VideoPin from "../components/VideoPin";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = ({ user }) => {
	console.log(user);
	return (
		<div>
			<Navbar user={user} />
			<div className="flex w-full">
				<div className="flex flex-col justify-start p-4 mt-4">
					{categories &&
						categories.map((data) => {
							return <Category key={data.id} data={data} />;
						})}
					<ToastContainer
						position="top-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
					/>
				</div>
				<div className="flex w-full justify-center items-center px-4">
					<Routes>
						<Route path="/" element={<Feed toast={toast} />} />
						<Route path="/category/:categoryID" element={<Feed toast={toast} />} />
						<Route
							path="/create"
							element={<Create categories={categories} toast={toast} />}
						/>
						<Route path="/videoDetail/:videoID" element={<VideoPin toast={toast} />} />
					</Routes>
				</div>
			</div>
		</div>
	);
};

export default Home;
