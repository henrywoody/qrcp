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
	React.useEffect(() => {
		// The CSS unit `cqh` only works if the container has a fixed height (specifically, won't work if the height is
		// defined with `flex-grow` in a flex parent). So this fixes the height of the body and other ancestors and
		// makes `cqh` work.
		// This is really only necessary because the scanner library used on the Copy page doesn't seem pick up on
		// inverted-colored QR codes (linen foreground and indigo background), which was what I wanted initially, so
		// we need a quiet zone. If that library is replaced (or if the QR code library is updated/replaced to support a
		// quiet zone) then this styling can be removed.
		document.body.classList.add("body--window-height");
		return () => {
			document.body.classList.remove("body--window-height");
		};
	}, []);

	return (
		<div className={styles["display"]}>
			<div className={styles["display__action-buttons"]}>
				<button onClick={onBack} className={styles["display__action-button"]}>
					<div className={styles["display__action-button__row"]}>
						<PencilIcon size="1rem" />
						<span>Edit</span>
					</div>
				</button>
			</div>

			<div className={styles["display__qr-code-container"]}>
				<div className={styles["display__qr-code__background"]}>
					<QRCode
						value={data}
						fgColor="var(--colors-indigo)"
						bgColor="var(--colors-linen)"
						className={styles["display__qr-code"]}
					/>
				</div>
			</div>
		</div>
	);
}
