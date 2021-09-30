import React, { FC } from "react";
import s from "./TitleWithSubHeadings.module.css";
import { Typography } from "@codat/orchard-ui";

export const TitleWithSubHeadings = ({ mainTitle, upperTitle, lowerTitle }) => {
	return (
		<div className={s.container}>
			<Typography variant="small" className={s.smallText}>
				{upperTitle}
			</Typography>
			<Typography variant="h1" className={s.largeText}>
				{mainTitle}
			</Typography>
			<Typography variant="small" className={s.smallText}>
				{lowerTitle}
			</Typography>
		</div>
	);
};
