import React from "react";
import styles from "./styles.module.css";

export type ButtonTone = "white" | "bubblegum" | "mint" | "lemon" | "periwinkle" | "ghost";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	tone?: ButtonTone;
	size?: "regular" | "large";
	icon?: React.ReactNode;
	block?: boolean;
};

export function Button({
	tone = "white",
	size = "regular",
	icon,
	block = false,
	type = "button",
	className = "",
	children,
	...props
}: ButtonProps) {
	const classNames = [
		styles["button"],
		styles[`button--${tone}`],
		styles[`button--${size}`],
		block ? styles["button--block"] : "",
		tone === "ghost" ? "" : "pressable",
		className,
	];

	return (
		<button type={type} className={classNames.join(" ")} {...props}>
			{icon && <span className={styles["button__icon"]}>{icon}</span>}
			{children}
		</button>
	);
}
