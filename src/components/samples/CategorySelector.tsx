// CategoriesSampleInteractive.tsx
import { useState, useEffect } from "preact/hooks";
import type { TaskCategory, Sample } from "@/types";
import SamplesModal from "@/components/samples/SamplesModal.tsx";
import CategorySelectorModal from "./CategorySelectorModal.tsx";

const rowLayouts: string[][] = [
	["col-span-3 md:col-span-1", "col-span-3 md:col-span-1", "col-span-3 md:col-span-1"],
	["col-span-3 md:col-span-2", "col-span-3 md:col-span-1"],
	["col-span-3 md:col-span-1", "col-span-3 md:col-span-2"],
	["col-span-3 md:col-span-3"],
	["col-span-3 md:col-span-1", "col-span-3 md:col-span-1"],
];

const createRows = (samples: Sample[]) => {
	const rows: { sample: Sample; span: string }[][] = [];
	let index = 0;
	let layoutIndex = 0;

	while (index < samples.length) {
		const layout = rowLayouts[layoutIndex % rowLayouts.length];
		const row: { sample: Sample; span: string }[] = [];

		for (let span of layout) {
			if (index >= samples.length) break;
			row.push({ sample: samples[index], span });
			index++;
		}

		rows.push(row);
		layoutIndex++;
	}

	return rows;
};

interface Props {
	initialTaskCategories: TaskCategory[];
}

export default function CategorySelector({ initialTaskCategories }: Props) {
	const [taskCategories] = useState<TaskCategory[]>(initialTaskCategories);
	const [selectedCategory, setSelectedCategory] = useState<TaskCategory>(initialTaskCategories[0]);
	const [rows, setRows] = useState<{ sample: Sample; span: string }[][]>([]);
	const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalStartIndex, setModalStartIndex] = useState(0);

	const handleSampleClick = (index: number) => {
		setModalStartIndex(index);
		setIsModalOpen(true);
	};

	useEffect(() => {
		if (selectedCategory?.samples) {
			setRows(createRows(selectedCategory.samples));
		}
	}, [selectedCategory]);

	const handleCategorySelect = (category: TaskCategory) => {
		setSelectedCategory(category);
	};

	return (
		<div>
			<div className="mb-6 flex justify-center lg:hidden">
				<button
					onClick={() => setIsCategoryModalOpen(true)}
					className="border-light-blue bg-sky-blue flex w-full items-center justify-between gap-2 rounded-xl border px-4 py-2"
				>
					<div className="flex items-center gap-x-1">
						<img src={selectedCategory.icon} alt={selectedCategory.title} className="h-4 w-4" />
						<span className="text-sm font-medium">{selectedCategory.title}</span>
					</div>
					<svg className="h-3 w-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.7a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>

			<div className="hidden flex-wrap justify-center gap-4 lg:flex">
				{taskCategories.map((category) => {
					const isSelected = selectedCategory?.slug === category.slug;

					return (
						<button
							key={category.slug}
							onClick={() => handleCategorySelect(category)}
							className={`group flex cursor-pointer flex-nowrap items-center gap-x-2 rounded border px-4 py-2 transition-colors ${
								isSelected
									? "border-light-blue bg-sky-blue text-[#9365E6]"
									: "border-neutral-95 hover:border-light-blue hover:bg-sky-blue"
							}`}
						>
							<img
								src={isSelected ? category.selectedIcon : category.icon}
								alt={category.title}
								className={`relative top-px h-4 w-4`}
							/>
							<h2 className="accent-neutral-60 text-sm">{category.title}</h2>
						</button>
					);
				})}
			</div>

			<div className="border-neutral-95 my-8 border-t"></div>
			{/* Divider */}

			<div className="grid grid-cols-3 gap-x-4 gap-y-16">
				{rows.map((row, rowIndex) =>
					row.map(({ sample, span }, itemIndex) => {
						const flatIndex = row
							.slice(0, itemIndex)
							.reduce((acc, _, i) => acc + 1, rows.slice(0, rowIndex).flat().length);
						return (
							<div
								key={`${rowIndex}-${itemIndex}`}
								className={`${span} min-h-[250px] w-full cursor-pointer overflow-hidden rounded-xl`}
								onClick={() => handleSampleClick(flatIndex)}
							>
								<img
									className="h-full w-full object-cover"
									src={sample.attachment.public_path}
									alt={sample.attachment.original_name}
								/>
							</div>
						);
					}),
				)}
			</div>

			<div className="border-neutral-95 my-16 border-t"></div>

			<SamplesModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				samples={selectedCategory.samples}
				initialIndex={modalStartIndex}
			/>

			<CategorySelectorModal
				isOpen={isCategoryModalOpen}
				onClose={() => setIsCategoryModalOpen(false)}
				taskCategories={taskCategories}
				selectedCategorySlug={selectedCategory.slug}
				onSelect={handleCategorySelect}
			/>
		</div>
	);
}
