import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
// Fonts are bundled (rather than loaded from Google Fonts) so the service worker can cache them for offline use.
// DM Sans renders user text, so it gets every subset; Unbounded only sets our own headings, so Latin is enough.
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/dm-sans/800.css";
import "@fontsource/unbounded/latin-700.css";
import "@fontsource/unbounded/latin-800.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
);
