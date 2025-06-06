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

export type IServiceThemeType = keyof typeof serviceThemes;
