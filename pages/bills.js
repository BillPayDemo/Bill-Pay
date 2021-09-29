import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import BlockButton from "../components/BlockButton";
import CompanyHeader from "../components/CompanyHeader/CompanyHeader";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Bills() {
	const { mutate } = useSWRConfig();
	const { data, error } = useSWR("/api/bills", fetcher);
	const handlePayClick = (id) => {
		axios.put("/api/bills", { id: id });
		mutate("/api/bills");
	};

	const handleSyncClick = () => {
		axios.post("/api/bills", { action: "sync" });
	};

	const listBills = (bills) => (
		<ul>
			{bills.map((bill) => (
				<li key={bill.id}>
					<pre>
						{JSON.stringify(
							{
								id: bill.id,
								status: bill.status,
								totalAmount: bill.totalAmount,
								amountDue: bill.amountDue,
								issueDate: bill.issueDate,
							},
							null,
							2
						)}
					</pre>
					<BlockButton onClick={() => handlePayClick(bill.id)} label="Pay" />
				</li>
			))}
		</ul>
	);

	return (
		<div>
			<CompanyHeader></CompanyHeader>
		</div>
	);
}
