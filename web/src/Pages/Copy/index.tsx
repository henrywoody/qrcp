import React from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Main } from "../../Components/Main";
import styles from "./styles.module.css";

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
			<h1>Copy</h1>

			{!data && <ScanView onScan={onScan} />}
			{data && <DisplayView data={data} onBack={onBack} />}
		</Main>
	);
}

type ScanViewProps = {
	onScan: (data: string) => void;
};

function ScanView({ onScan }: ScanViewProps) {
	React.useEffect(() => {
		const onScanSuccess = (decodedText: string) => {
			onScan(decodedText);
		};

		const onScanFailure = () => {};

		const scanner = new Html5QrcodeScanner("scanner", { fps: 10, qrbox: { width: 250, height: 250 } }, false);
		scanner.render(onScanSuccess, onScanFailure);

		return () => {
			scanner.clear();
		};
	}, []);

	return (
		<div className={styles["scanner-container"]}>
			<div id="scanner" className={styles["scanner"]}></div>
		</div>
	);
}

type DisplayViewProps = {
	data: string;
	onBack: () => void;
};

function DisplayView({ data, onBack }: DisplayViewProps) {
	return (
		<div>
			<div>
				<button onClick={onBack}>Back</button>
			</div>
			<p>{data}</p>
		</div>
	);
}
