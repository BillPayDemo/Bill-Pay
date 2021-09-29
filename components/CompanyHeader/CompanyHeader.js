import React from "react";
import s from "./CompanyHeader.module.css";
import { BankIcon, Typography } from "@codat/orchard-ui";

export default function CompanyHeader() {
	return (
		<div className={s.header}>
			<BankIcon fillColor="#482DEB" className={s.icon} />
			<Typography
				style={{
					color: "#482DEB",
				}}
				variant="h3"
			>
				{" "}
				CoBank{" "}
			</Typography>
		</div>
	);
}
