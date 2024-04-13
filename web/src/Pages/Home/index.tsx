import { Link } from "react-router-dom";

export function HomePage() {
	return (
		<main>
			<h1>Home</h1>

			<ul>
				<li>
					<Link to="/copy">Copy</Link>
				</li>
				<li>
					<Link to="/paste">Paste</Link>
				</li>
			</ul>
		</main>
	);
}
