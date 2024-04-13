import React from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export function CopyPage() {
	const [data, setData] = React.useState("");

	const onScan = React.useCallback((data: string) => {
		window.setTimeout(() => setData(data), 500);
	}, []);

	const onBack = React.useCallback(() => {
		setData("");
	}, []);

	return (
		<main>
			<h1>Copy</h1>

			{!data && <ScanView onScan={onScan} />}
			{data && <DisplayView data={data} onBack={onBack} />}
		</main>
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
		<div>
			<div id="scanner" style={{ width: 600 }}></div>
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
