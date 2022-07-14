import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPlusSquareFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";

const Navbar = ({ user }) => {
	return (
		<div className="flex justify-between items-center w-full  px-4">
			<Link to="/">
				<img src={logo} alt="/" className="w-16 md:w-24 h-auto" />
			</Link>
			<div className="w-[60vw] relative shadow-lg">
				<input
					type="text"
					name=""
					id=""
					placeholder="Search..."
					className="input input-md w-full pl-14 text-lg bg-neutral"
				/>
				<AiOutlineSearch className="absolute top-2 left-3  " size={32} />
			</div>
			<div className="flex justify-center items-center gap-8">
				{/* create Button */}
				<Link to="/create">
					<div className="flex justify-center items-center bg-neutral hover:shadow-lg hover:scale-110 ease-in-out duration-300 ">
						<BsPlusSquareFill size={32} />
					</div>
				</Link>

				{/* Drop down menu */}
				<div className="dropdown dropdown-end">
					<label tabIndex="0" className=" m-1 cursor-pointer">
						<img
							src={user?.photoURL}
							alt="/"
							className="w-[40px] h-[40px] rounded-full"
						/>
					</label>
					<ul
						tabIndex="0"
						className="dropdown-content menu p-2 shadow-xl bg-base-300 rounded-box w-52"
					>
						<li>
							<Link to={""}>My Account</Link>
						</li>
						<li>
							<a>
								Log Out <MdLogout size={20} />
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
