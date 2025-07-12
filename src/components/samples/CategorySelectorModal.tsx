import { useEffect, useState } from "preact/hooks";
import type { TaskCategory } from "@/types";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	taskCategories: TaskCategory[];
	selectedCategorySlug: string;
	onSelect: (category: TaskCategory) => void;
}

export default function CategorySelectorModal({
	isOpen,
	onClose,
	taskCategories,
	selectedCategorySlug,
	onSelect,
}: Props) {
	const [showModal, setShowModal] = useState(false);

	// When modal opens or closes, animate with delay
	useEffect(() => {
		if (isOpen) {
			setShowModal(true);
		} else {
			// Wait for animation to finish before unmounting
			const timeout = setTimeout(() => setShowModal(false), 200); // 200ms must match transition duration
			return () => clearTimeout(timeout);
		}
	}, [isOpen]);

	if (!isOpen && !showModal) return null;

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
				isOpen ? "opacity-100" : "pointer-events-none opacity-0"
			}`}
		>
			{/* Backdrop */}
			<div
				className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
					isOpen ? "opacity-100" : "opacity-0"
				}`}
				onClick={onClose}
			></div>

			{/* Modal content */}
			<div
				className={`relative w-full max-w-sm transform rounded-xl bg-white p-6 shadow-lg transition-all duration-300 ${
					isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
				}`}
			>
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-lg font-medium">Pick a design type</h2>
					<button
						onClick={onClose}
						className="text-neutral-60 hover:text-neutral-80 text-2xl font-light"
					>
						×
					</button>
				</div>
				<div className="flex max-h-[70vh] flex-col gap-3 overflow-y-auto">
					{taskCategories.map((category) => (
						<button
							key={category.slug}
							onClick={() => {
								onSelect(category);
								onClose();
							}}
							className={`flex items-center gap-3 rounded-lg border p-3 text-sm transition-colors ${
								category.slug === selectedCategorySlug
									? "border-light-blue bg-sky-blue text-purple-500"
									: "border-neutral-90 hover:border-light-blue"
							}`}
						>
							<img src={category.icon} alt={category.title} className="h-5 w-5" />
							{category.title}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
