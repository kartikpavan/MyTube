import React, { useEffect } from "react";
import { Rings } from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Spinner = ({ msg, progress }) => {
	useEffect(() => {}, [progress]);

	return (
		<div className="flex flex-col items-center justify-center h-full px-10">
			<Rings height="100" width="100" color="#bca0dc" ariaLabel="loading" />
			<p className="text-sm md:text-xl text-center px-2 py-2 ">{msg}</p>
			{progress && (
				<progress
					class="progress progress-primary w-96"
					value={Number.parseInt(progress)}
					max="100"
				></progress>
			)}
		</div>
	);
};

export default Spinner;
