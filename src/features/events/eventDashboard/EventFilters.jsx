import React from "react";
import { Header, Menu } from "semantic-ui-react";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";

export default function EventFilters({ predicate, setPredicate, loading }) {
	const { authenticated } = useSelector((state) => state.auth);
	return (
		<>
			{authenticated && (
				<Menu vertical size='large' style={{ width: "100%" }}>
					<Header icon='filter' attached color='teal' content='Filters' />
					<Menu.Item
						content='All Events'
						disabled={loading}
						active={predicate.get("filter") === "all"}
						onClick={() => setPredicate("filter", "all")}
					/>
					<Menu.Item
						content="I'm going"
						disabled={loading}
						active={predicate.get("filter") === "isGoing"}
						onClick={() => setPredicate("filter", "isGoing")}
					/>
					<Menu.Item
						content="I'm hosting"
						disabled={loading}
						active={predicate.get("filter") === "isHosting"}
						onClick={() => setPredicate("filter", "isHosting")}
					/>
				</Menu>
			)}
			<Header icon='calendar' attached color='teal' content='Select Date' />
			<Calendar
				onChange={(date) => setPredicate("startDate", date)}
				value={predicate.get("startDate") || new Date()}
				tileDisabled={() => loading}
			/>
		</>
	);
}
