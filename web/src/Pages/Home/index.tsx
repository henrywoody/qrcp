import { Link } from "react-router-dom";

export function HomePage() {
	return (
		<main>
			<h1>Home</h1>

			<div>
				<Link to="/paste">Paste</Link>
			</div>
		</main>
	);
}
