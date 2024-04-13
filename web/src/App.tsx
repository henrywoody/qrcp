import { Route, Switch } from "react-router-dom";
import { HomePage } from "./Pages/Home";
import { PastePage } from "./Pages/Paste";
import { CopyPage } from "./Pages/Copy";

export default function App() {
	return (
		<Switch>
			<Route path="/" exact>
				<HomePage />
			</Route>
			<Route path="/copy">
				<CopyPage />
			</Route>
			<Route path="/paste">
				<PastePage />
			</Route>
		</Switch>
	);
}
