import type { AstroComponentFactory } from "astro";
import { serviceThemes } from "@/data/services.ts";

export type IServiceItem = {
	icon: any;
	title: string;
	theme: IServiceThemeType;
};

export type IServiceTheme = {
	background: string;
	textColor: string;
};

type IBenefits = Array<{
	title: string;
	description: string;
	icon: AstroComponentFactory;
	darkIcon: AstroComponentFactory;
}>;

type Attachment = {
	id: number;
	public_path: string;
	file_id: string;
	name: name;
	original_name: string;
	instance_of: string;
};

type Sample = {
	id: number;
	task_category_id: number;
	attachment: Attachment;
};

type TaskCategory = {
	id: number;
	title: string;
	description: string;
	slug: string;
	image_url: string;
	background: string;
	enabled: boolean;
	sort_order_on_samples: number;
	samples: Array<Sample>;
	icon: AstroComponentFactory;
	selectedIcon: AstroComponentFactory;
};

export type IServiceThemeType = keyof typeof serviceThemes;
