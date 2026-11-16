import styles from "./styles.module.css";

const INK = "#121212";
const LEMON = "#ffe14d";
const BUBBLEGUM = "#ff8fcf";

export type LogoIconProps = {
	size?: number;
	className?: string;
};

/** The app icon: a pink keycap with a QR finder pattern on it, sitting on a lemon tile. */
export function LogoIcon({ size = 32, className }: LogoIconProps) {
	const stroke = size >= 48 ? 3 : 4;
	return (
		<svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" className={className}>
			<rect
				x={stroke / 2}
				y={stroke / 2}
				width={64 - stroke}
				height={64 - stroke}
				rx="15"
				fill={LEMON}
				stroke={INK}
				strokeWidth={stroke}
			/>
			<rect x="13" y="15" width="38" height="38" rx="9" fill={INK} />
			<rect x="13" y="10" width="38" height="38" rx="9" fill={BUBBLEGUM} stroke={INK} strokeWidth={stroke} />
			<rect x="22" y="19" width="20" height="20" rx="3" fill={INK} />
			<rect x="25" y="22" width="14" height="14" rx="1.5" fill={BUBBLEGUM} />
			<rect x="28" y="25" width="8" height="8" rx="1" fill={INK} />
		</svg>
	);
}

export type LockupProps = {
	className?: string;
};

/** Icon + "qrcp" wordmark. */
export function Lockup({ className = "" }: LockupProps) {
	return (
		<span className={styles["lockup"] + " " + className}>
			<LogoIcon className={styles["lockup__icon"]} />
			<span className={styles["lockup__name"]}>qrcp</span>
		</span>
	);
}
