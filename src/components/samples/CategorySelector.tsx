// CategoriesSampleInteractive.tsx
import { useState, useEffect } from "preact/hooks";
import type { TaskCategory, Sample } from "@/types";

const rowLayouts: string[][] = [
	["col-span-1", "col-span-1", "col-span-1"],
	["col-span-2", "col-span-1"],
	["col-span-1", "col-span-2"],
	["col-span-3"],
	["col-span-1", "col-span-1"],
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
			<div className="flex flex-wrap justify-center gap-4">
				{taskCategories.map((category) => {
					const IconComponent = category.icon;
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
					row.map(({ sample, span }, itemIndex) => (
						<div
							key={`${rowIndex}-${itemIndex}`}
							className={`${span} min-h-[250px] w-full overflow-hidden rounded-xl`}
						>
							<img
								className="h-full w-full object-cover"
								src={sample.attachment.public_path}
								alt={sample.attachment.original_name}
							/>
						</div>
					)),
				)}
			</div>

			<div className="border-neutral-95 my-16 border-t"></div>
			{/* Extra large divider */}
		</div>
	);
}
