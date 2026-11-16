import React from "react";
import QRCode from "react-qr-code";
import { ClipboardPasteIcon, PencilIcon, PlusIcon, QrCodeIcon } from "lucide-react";
import { Button } from "../../Components/Button";
import { Main } from "../../Components/Main";
import { PageHeader } from "../../Components/PageHeader";
import { hasFinePointer, modifierKey } from "../../platform";
import styles from "./styles.module.css";

const canReadClipboard = !!navigator.clipboard?.readText;

export function PastePage() {
	const [data, setData] = React.useState("");
	const [showQR, setShowQR] = React.useState(false);

	const onSubmit = React.useCallback(() => {
		setShowQR(true);
	}, []);
	const onEdit = React.useCallback(() => {
		setShowQR(false);
	}, []);
	const onNew = React.useCallback(() => {
		setData("");
		setShowQR(false);
	}, []);

	return (
		<Main>
			<PageHeader title="Paste" />

			{!showQR && <InputView data={data} setData={setData} onSubmit={onSubmit} />}
			{showQR && <DisplayView data={data} onEdit={onEdit} onNew={onNew} />}
		</Main>
	);
}

type InputViewProps = {
	data: string;
	setData: (data: string) => void;
	onSubmit: () => void;
};

function InputView({ data, setData, onSubmit }: InputViewProps) {
	const [clipboardError, setClipboardError] = React.useState(false);
	const canSubmit = data.length > 0;

	const onChange = React.useCallback(
		(event: React.ChangeEvent<HTMLTextAreaElement>) => {
			setData(event.target.value);
		},
		[setData],
	);

	const onFormSubmit = React.useCallback(
		(event: React.FormEvent) => {
			event.preventDefault();
			if (canSubmit) {
				onSubmit();
			}
		},
		[canSubmit, onSubmit],
	);

	const onKeyDown = React.useCallback(
		(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
			if (event.key === "Enter" && (event.metaKey || event.ctrlKey) && canSubmit) {
				event.preventDefault();
				onSubmit();
			}
		},
		[canSubmit, onSubmit],
	);

	const pasteFromClipboard = React.useCallback(async () => {
		try {
			const text = await navigator.clipboard.readText();
			setData(text);
			setClipboardError(false);
		} catch {
			setClipboardError(true);
		}
	}, [setData]);

	return (
		<form className={styles["form"]} onSubmit={onFormSubmit}>
			<label htmlFor="paste-input" className="visually-hidden">
				Text to turn into a QR code
			</label>
			<div className={styles["field"]}>
				<textarea
					id="paste-input"
					className={styles["field__input"]}
					placeholder="Type or paste text…"
					value={data}
					onChange={onChange}
					onKeyDown={onKeyDown}
					autoFocus={hasFinePointer}
					spellCheck={false}
				></textarea>
				<span className={styles["field__count"]} aria-live="polite">
					{data.length} {data.length === 1 ? "character" : "characters"}
				</span>
			</div>

			{clipboardError && (
				<p className={styles["form__note"]} role="alert">
					Your browser blocked clipboard access. Long-press the box above and choose Paste instead.
				</p>
			)}

			<div className={styles["form__actions"]}>
				{canReadClipboard && (
					<Button icon={<ClipboardPasteIcon />} onClick={pasteFromClipboard} className={styles["form__action"]}>
						From clipboard
					</Button>
				)}
				<Button
					type="submit"
					tone="bubblegum"
					icon={<QrCodeIcon />}
					disabled={!canSubmit}
					className={styles["form__action"]}
				>
					Make QR
					<kbd className={styles["form__shortcut"]}>{modifierKey} ↵</kbd>
				</Button>
			</div>
		</form>
	);
}

type DisplayViewProps = {
	data: string;
	onEdit: () => void;
	onNew: () => void;
};

function DisplayView({ data, onEdit, onNew }: DisplayViewProps) {
	return (
		<div className={styles["display"]}>
			<div className={styles["display__qr-card"]} role="img" aria-label="QR code of your text">
				<QRCode value={data} fgColor="#121212" bgColor="#ffffff" className={styles["display__qr-code"]} />
			</div>

			<div className={styles["display__side"]}>
				<p className={styles["display__hint"]}>
					Open <strong>qrcp</strong> on your other device, tap <strong>Copy</strong>, and point it here.
				</p>

				<div className={styles["display__sticker"]}>
					<span className={styles["display__sticker-label"]}>Your text</span>
					<span className={styles["display__sticker-text"]}>{data}</span>
				</div>

				<div className={styles["display__actions"]}>
					<Button icon={<PencilIcon />} onClick={onEdit}>
						Edit
					</Button>
					<Button tone="periwinkle" icon={<PlusIcon />} onClick={onNew}>
						New
					</Button>
				</div>
			</div>
		</div>
	);
}
