import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";

export type BackLinkProps = {
	className?: string;
};

export function BackLink({ className }: BackLinkProps) {
	return (
		<Link to="/" className={className}>
			<ArrowLeftIcon size="1.5rem" style={{ display: "block" }} />
		</Link>
	);
}
