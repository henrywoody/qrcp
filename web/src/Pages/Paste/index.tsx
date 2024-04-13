import React from "react";
import QRCode from "react-qr-code";

export function PastePage() {
	const [data, setData] = React.useState("");

	const [showQR, setShowQR] = React.useState(false);
	const onSubmit = React.useCallback(() => {
		setShowQR(true);
	}, []);
	const onBack = React.useCallback(() => {
		setShowQR(false);
	}, []);

	return (
		<main>
			<h1>Paste</h1>

			{!showQR && <InputView data={data} setData={setData} onSubmit={onSubmit} />}
			{showQR && <DisplayView data={data} onBack={onBack} />}
		</main>
	);
}

type InputViewProps = {
	data: string;
	setData: (data: string) => void;
	onSubmit: () => void;
};

function InputView({ data, setData, onSubmit }: InputViewProps) {
	const onChange = React.useCallback(
		(event: React.ChangeEvent<HTMLTextAreaElement>) => {
			setData(event.target.value);
		},
		[setData],
	);

	return (
		<div>
			<textarea name="" id="paste-input" cols={40} rows={10} value={data} onChange={onChange}></textarea>
			<br />
			<button onClick={onSubmit} disabled={!data}>
				Make QR
			</button>
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
			<QRCode value={data} />
		</div>
	);
}
