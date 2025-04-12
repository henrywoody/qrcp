import React from "react";
import styles from "./styles.module.css";

export type MainProps = React.HTMLAttributes<HTMLDivElement>;

export function Main({ className = "", ...props }: MainProps) {
	return <main className={styles["main"] + " " + className} {...props} />;
}
