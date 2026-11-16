import React from "react";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { CameraOffIcon, CheckIcon, CopyIcon, ImageUpIcon } from "lucide-react";
import { Button } from "../../Components/Button";
import { Main } from "../../Components/Main";
import { PageHeader } from "../../Components/PageHeader";
import styles from "./styles.module.css";

const cameraReaderID = "camera-reader";
const fileReaderID = "file-reader";

type CameraStatus = "starting" | "scanning" | "error";

export function CopyPage() {
	const [data, setData] = React.useState<string | null>(null);
	const [cameraStatus, setCameraStatus] = React.useState<CameraStatus>("starting");
	const [cameraAttempt, setCameraAttempt] = React.useState(0);
	const [fileError, setFileError] = React.useState(false);
	const [copied, setCopied] = React.useState(false);
	const [copyError, setCopyError] = React.useState(false);

	const onScan = React.useCallback((text: string) => {
		navigator.vibrate?.(40);
		setData(text);
		setFileError(false);
	}, []);

	const scanAgain = React.useCallback(() => {
		setData(null);
		setCopied(false);
		setCopyError(false);
		setCameraStatus("starting");
	}, []);

	const retryCamera = React.useCallback(() => {
		setCameraStatus("starting");
		setCameraAttempt((attempt) => attempt + 1);
	}, []);

	const copyToClipboard = React.useCallback(async () => {
		if (data === null) {
			return;
		}
		try {
			await navigator.clipboard.writeText(data);
			setCopied(true);
			setCopyError(false);
		} catch {
			setCopyError(true);
		}
	}, [data]);

	const fileInputRef = React.useRef<HTMLInputElement>(null);
	const onFileChange = React.useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			event.target.value = "";
			if (!file) {
				return;
			}
			try {
				const text = await new Html5Qrcode(fileReaderID, false).scanFile(file, false);
				onScan(text);
			} catch {
				setFileError(true);
			}
		},
		[onScan],
	);

	return (
		<Main>
			<PageHeader title="Copy" />

			<div className={styles["layout"]}>
				<div className={styles["camera"]}>
					<CameraPlaceholder />
					{data === null && <CameraReader key={cameraAttempt} onScan={onScan} onStatusChange={setCameraStatus} />}
					<svg viewBox="0 0 240 240" className={styles["camera__corners"]} aria-hidden="true">
						<path d="M48 74V60a12 12 0 0 1 12-12h14M166 48h14a12 12 0 0 1 12 12v14M192 166v14a12 12 0 0 1-12 12h-14M74 192H60a12 12 0 0 1-12-12v-14" />
					</svg>
					{data === null && cameraStatus === "error" && (
						<div className={styles["camera__error"]}>
							<CameraOffIcon className={styles["camera__error-icon"]} aria-hidden="true" />
							<span>Camera unavailable</span>
							<Button onClick={retryCamera}>Try again</Button>
						</div>
					)}
				</div>

				<div className={styles["side"]}>
					{data === null ? (
						<div className={styles["card"]} aria-live="polite">
							<span className={styles["card__label"]}>
								{cameraStatus === "error" ? "No camera access" : "Scanning"}
							</span>
							<span className={styles["card__text"]}>
								{cameraStatus === "error"
									? "Allow camera access in your browser, or scan a screenshot instead."
									: "Point your camera at a qrcp code."}
							</span>
						</div>
					) : (
						<div className={styles["card"]}>
							<span className={styles["card__label"]}>Found text</span>
							<span className={styles["card__text"] + " " + styles["card__text--result"]}>{data}</span>
							{copied && (
								<span className={styles["card__sticker"]} role="status">
									<CheckIcon aria-hidden="true" />
									Copied!
								</span>
							)}
						</div>
					)}

					{fileError && (
						<p className={styles["note"]} role="alert">
							No QR code found in that image. Try a sharper, closer screenshot.
						</p>
					)}
					{copyError && (
						<p className={styles["note"]} role="alert">
							Your browser blocked clipboard access. Select the text above and copy it manually.
						</p>
					)}

					<div className={styles["actions"]}>
						{data === null ? (
							<Button block icon={<ImageUpIcon />} onClick={() => fileInputRef.current?.click()}>
								Scan an image instead
							</Button>
						) : (
							<>
								<Button block size="large" tone="bubblegum" icon={<CopyIcon />} onClick={copyToClipboard}>
									{copied ? "Copy again" : "Copy text"}
								</Button>
								<Button block tone="ghost" onClick={scanAgain}>
									Scan again
								</Button>
							</>
						)}
					</div>
				</div>
			</div>

			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				onChange={onFileChange}
				hidden
				aria-label="Choose an image with a QR code"
			/>
			<div id={fileReaderID} hidden></div>
		</Main>
	);
}

type CameraReaderProps = {
	onScan: (data: string) => void;
	onStatusChange: (status: CameraStatus) => void;
};

/**
 * Runs the camera while mounted. The scanning library renders a `<video>` at the container's width and its natural
 * height and maps that element's layout size back to the video frame, so the video's layout box must keep the stream's
 * aspect ratio. To fill the square viewfinder we leave layout alone and scale it with a transform instead.
 */
function CameraReader({ onScan, onStatusChange }: CameraReaderProps) {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const onScanRef = React.useRef(onScan);
	onScanRef.current = onScan;
	const onStatusChangeRef = React.useRef(onStatusChange);
	onStatusChangeRef.current = onStatusChange;

	React.useEffect(() => {
		const scanner = new Html5Qrcode(cameraReaderID, false);
		let unmounted = false;
		let scanned = false;
		let video: HTMLVideoElement | null = null;

		const fitVideo = () => {
			const container = containerRef.current;
			if (!container || !video || !video.clientWidth || !video.clientHeight) {
				return;
			}
			const scale = Math.max(container.clientWidth / video.clientWidth, container.clientHeight / video.clientHeight);
			video.style.transform = `translate(-50%, -50%) scale(${scale})`;
		};

		onStatusChangeRef.current("starting");
		const started = scanner
			.start(
				{ facingMode: "environment" },
				{ fps: 10 },
				(text) => {
					if (unmounted || scanned) {
						return;
					}
					scanned = true;
					onScanRef.current(text);
				},
				undefined,
			)
			.then(() => {
				if (unmounted) {
					return;
				}
				video = containerRef.current?.querySelector("video") ?? null;
				video?.addEventListener("playing", fitVideo);
				video?.addEventListener("resize", fitVideo);
				window.addEventListener("resize", fitVideo);
				fitVideo();
				onStatusChangeRef.current("scanning");
			})
			.catch(() => {
				if (!unmounted) {
					onStatusChangeRef.current("error");
				}
			});

		return () => {
			unmounted = true;
			window.removeEventListener("resize", fitVideo);
			started.finally(() => {
				const state = scanner.getState();
				if (state === Html5QrcodeScannerState.SCANNING || state === Html5QrcodeScannerState.PAUSED) {
					scanner
						.stop()
						.then(() => scanner.clear())
						.catch(() => {});
				}
			});
		};
	}, []);

	return <div id={cameraReaderID} ref={containerRef} className={styles["camera__reader"]}></div>;
}

/** Faint QR shapes shown behind the viewfinder while the camera is off or starting. */
function CameraPlaceholder() {
	return (
		<svg viewBox="0 0 240 240" className={styles["camera__placeholder"]} aria-hidden="true">
			<g fill="#ffffff">
				<rect x="80" y="80" width="26" height="26" rx="4" />
				<rect x="130" y="80" width="26" height="26" rx="4" />
				<rect x="80" y="130" width="26" height="26" rx="4" />
				<rect x="118" y="122" width="8" height="8" rx="2" />
				<rect x="134" y="134" width="8" height="16" rx="2" />
				<rect x="146" y="122" width="10" height="8" rx="2" />
			</g>
			<g fill="#121212">
				<rect x="84" y="84" width="18" height="18" rx="2" />
				<rect x="134" y="84" width="18" height="18" rx="2" />
				<rect x="84" y="134" width="18" height="18" rx="2" />
			</g>
			<g fill="#ffffff">
				<rect x="88" y="88" width="10" height="10" rx="1" />
				<rect x="138" y="88" width="10" height="10" rx="1" />
				<rect x="88" y="138" width="10" height="10" rx="1" />
			</g>
		</svg>
	);
}
