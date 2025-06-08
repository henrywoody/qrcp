import React from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { CopyIcon, XIcon } from "lucide-react";
import { BackLink } from "../../Components/BackLink";
import { Main } from "../../Components/Main";
import styles from "./styles.module.css";
import "./scanner.css";

export function CopyPage() {
	const [data, setData] = React.useState("");

	const onScan = React.useCallback((data: string) => {
		window.setTimeout(() => setData(data), 500);
	}, []);

	const onBack = React.useCallback(() => {
		setData("");
	}, []);

	return (
		<Main>
			<div className={styles["heading"]}>
				<BackLink className={styles["heading__back-link"]} />
				<h1>Copy</h1>
			</div>

			{!data && <ScanView onScan={onScan} />}
			{data && <DisplayView data={data} onBack={onBack} />}
		</Main>
	);
}

const scannerID = "scanner";

type ScanViewProps = {
	onScan: (data: string) => void;
};

function ScanView({ onScan }: ScanViewProps) {
	React.useEffect(() => {
		const onScanSuccess = (decodedText: string) => {
			onScan(decodedText);
		};

		const onScanFailure = () => {};

		const scanner = new Html5QrcodeScanner(scannerID, { fps: 10, qrbox: { width: 250, height: 250 } }, false);
		scanner.render(onScanSuccess, onScanFailure);

		return () => {
			scanner.clear();
		};
	}, []);

	return (
		<div className={styles["scanner-container"]}>
			<div id={scannerID} className={styles["scanner"] + " scanner"}></div>
		</div>
	);
}

type DisplayViewProps = {
	data: string;
	onBack: () => void;
};

function DisplayView({ data, onBack }: DisplayViewProps) {
	const copyToClipboard = React.useCallback(() => {
		navigator.clipboard.writeText(data);
	}, [data]);

	return (
		<div className={styles["display"]}>
			<div className={styles["display__action-buttons"]}>
				<button onClick={copyToClipboard} className={styles["display__action-button"]}>
					<div className={styles["display__action-button__row"]}>
						<CopyIcon size="1rem" />
						<span>Copy</span>
					</div>
				</button>

				<button onClick={onBack} className={styles["display__action-button"]}>
					<div className={styles["display__action-button__row"]}>
						<XIcon size="1rem" />
						<span>Clear</span>
					</div>
				</button>
			</div>

			<div className={styles["display__content"]}>{data}</div>
		</div>
	);
}
