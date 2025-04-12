import { ClipboardCopyIcon, ClipboardPasteIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Main } from "../../Components/Main";
import styles from "./styles.module.css";

export function HomePage() {
	return (
		<Main>
			<div className={styles["heading"]}>
				<h1>QRCP</h1>

				<p>Copy and paste text between devices using QR codes.</p>
			</div>

			<div className={styles["links"]}>
				<Link to="/copy" className={styles["link"]}>
					<ClipboardCopyIcon strokeWidth={1} className={styles["link__icon"]} />
					<span className={styles["link__title"]}>Copy</span>
					<span className={styles["link__description"]}>Copy from a QR code</span>
				</Link>
				<Link to="/paste" className={styles["link"]}>
					<ClipboardPasteIcon strokeWidth={1} className={styles["link__icon"]} />
					<span className={styles["link__title"]}>Paste</span>
					<span className={styles["link__description"]}>Paste into a QR code</span>
				</Link>
			</div>
		</Main>
	);
}
