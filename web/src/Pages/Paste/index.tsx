import React from "react";
import { ClipboardIcon, PencilIcon } from "lucide-react";
import QRCode from "react-qr-code";
import { BackLink } from "../../Components/BackLink";
import { Main } from "../../Components/Main";
import styles from "./styles.module.css";

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
		<Main>
			<div className={styles["heading"]}>
				<BackLink className={styles["heading__back-link"]} />
				<h1>Paste</h1>
			</div>

			{!showQR && <InputView data={data} setData={setData} onSubmit={onSubmit} />}
			{showQR && <DisplayView data={data} onBack={onBack} />}
		</Main>
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

	const pasteFromClipboard = React.useCallback(async () => {
		const text = await navigator.clipboard.readText();
		setData(text);
	}, [setData]);

	return (
		<div className={styles["form"]}>
			<textarea name="" id="paste-input" cols={40} rows={10} value={data} onChange={onChange}></textarea>
			<div className={styles["form__action-buttons"]}>
				<button onClick={pasteFromClipboard} className={styles["form__action-button"]}>
					<div className={styles["form__action-button__row"]}>
						<ClipboardIcon size="1rem" />
						<span>Paste</span>
					</div>
				</button>

				<button onClick={onSubmit} disabled={!data} className={styles["form__action-button"]}>
					Make QR
				</button>
			</div>
		</div>
	);
}

type DisplayViewProps = {
	data: string;
	onBack: () => void;
};

function DisplayView({ data, onBack }: DisplayViewProps) {
	return (
		<div className={styles["display"]}>
			<div>
				<button onClick={onBack} className={styles["display__action-button"]}>
					<div className={styles["display__action-button__row"]}>
						<PencilIcon size="1rem" />
						<span>Edit</span>
					</div>
				</button>
			</div>

			<div className={styles["display__qr-code-container"]}>
				<QRCode
					value={data}
					fgColor="var(--colors-linen)"
					bgColor="var(--colors-indigo)"
					className={styles["display__qr-code"]}
				/>
			</div>
		</div>
	);
}
