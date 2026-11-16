import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Lockup } from "../Logo";
import styles from "./styles.module.css";

export type PageHeaderProps = {
	title: string;
};

export function PageHeader({ title }: PageHeaderProps) {
	return (
		<header className={styles["header"]}>
			<Link to="/" className={styles["header__back"] + " pressable"} aria-label="Back to home">
				<ArrowLeftIcon strokeWidth={2.8} className={styles["header__back-icon"]} />
			</Link>
			<h1 className={styles["header__title"]}>{title}</h1>
			<Link to="/" className={styles["header__brand"]} aria-label="qrcp home">
				<Lockup />
			</Link>
		</header>
	);
}
