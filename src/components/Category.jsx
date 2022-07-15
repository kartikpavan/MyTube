import React from "react";
import { Link } from "react-router-dom";

const Category = ({ data }) => {
	return (
		<div className="flex cursor-pointer my-4">
			<Link to={`/category/${data.name}`}>
				<div className="tooltip tooltip-primary tooltip-right" data-tip={data.name}>
					<span>{data.iconSrc}</span>
				</div>
			</Link>
		</div>
	);
};

export default Category;
