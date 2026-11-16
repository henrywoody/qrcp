import React from "react";
import { ArrowRightIcon, ClipboardPlusIcon, ScanLineIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Lockup } from "../../Components/Logo";
import { Main } from "../../Components/Main";
import { modifierKey } from "../../platform";
import styles from "./styles.module.css";

export function HomePage() {
	return (
		<Main>
			<header className={styles["top"]}>
				<Lockup />
			</header>

			<div className={styles["body"]}>
				<section className={styles["hero"]}>
					<h1 className={styles["headline"]}>
						<span className="visually-hidden">Copy here. Paste there.</span>
						<span className={styles["headline__row"]} aria-hidden="true">
							<Keycap>{modifierKey}</Keycap>
							<Keycap tone="bubblegum">C</Keycap>
							<span className={styles["headline__word"]}>here.</span>
						</span>
						<span className={styles["headline__row"]} aria-hidden="true">
							<Keycap>{modifierKey}</Keycap>
							<Keycap tone="mint">V</Keycap>
							<span className={styles["headline__word"]}>there.</span>
						</span>
					</h1>
					<p className={styles["description"]}>Text between devices by QR code. No sign-up, nothing uploaded.</p>
				</section>

				<section className={styles["steps"]} aria-labelledby="how-it-works">
					<h2 id="how-it-works" className={styles["steps__title"]}>
						How it works
					</h2>
					<ol className={styles["steps__list"]} role="list">
						<li className={styles["step"]}>
							<span className={styles["step__key"] + " " + styles["step__key--bubblegum"]} aria-hidden="true">
								1
							</span>
							<span className={styles["step__text"]}>
								<strong>Paste</strong> text on one device
							</span>
						</li>
						<li className={styles["step"]}>
							<span className={styles["step__key"] + " " + styles["step__key--lemon"]} aria-hidden="true">
								2
							</span>
							<span className={styles["step__text"]}>
								<strong>Scan</strong> the code with your other device
							</span>
						</li>
						<li className={styles["step"]}>
							<span className={styles["step__key"] + " " + styles["step__key--mint"]} aria-hidden="true">
								3
							</span>
							<span className={styles["step__text"]}>
								<strong>Copy</strong> the text and you’re done
							</span>
						</li>
					</ol>
				</section>

				<nav className={styles["actions"]} aria-label="Choose what to do">
					<ActionCard
						to="/paste"
						tone="bubblegum"
						icon={<ClipboardPlusIcon />}
						title="Paste"
						description="Turn text into a QR code"
					/>
					<ActionCard
						to="/copy"
						tone="mint"
						icon={<ScanLineIcon />}
						title="Copy"
						description="Scan a code to grab its text"
					/>
				</nav>
			</div>
		</Main>
	);
}

type KeycapProps = {
	tone?: "white" | "bubblegum" | "mint";
	children: React.ReactNode;
};

function Keycap({ tone = "white", children }: KeycapProps) {
	return <span className={styles["keycap"] + " " + styles[`keycap--${tone}`]}>{children}</span>;
}

type ActionCardProps = {
	to: string;
	tone: "bubblegum" | "mint";
	icon: React.ReactNode;
	title: string;
	description: string;
};

function ActionCard({ to, tone, icon, title, description }: ActionCardProps) {
	return (
		<Link to={to} className={styles["action"] + " " + styles[`action--${tone}`] + " pressable"}>
			<span className={styles["action__icon"]}>{icon}</span>
			<span className={styles["action__text"]}>
				<span className={styles["action__title"]}>{title}</span>
				<span className={styles["action__description"]}>{description}</span>
			</span>
			<ArrowRightIcon className={styles["action__arrow"]} aria-hidden="true" />
		</Link>
	);
}
