import type { IServiceItem } from "@/types";
import BackgroundRemovalIcon from "@/assets/icons/services/background-removal.svg";
import BlogImagesIcon from "@/assets/icons/services/blog-images.svg";
import EmailSignatureIcon from "@/assets/icons/services/email-signatures.svg";
import IllustrationsIcon from "@/assets/icons/services/illustrations.svg";
import InfographicsIcon from "@/assets/icons/services/infographics.svg";
import LogoDesignIcon from "@/assets/icons/services/logo-design.svg";
import PowerpointTemplatesIcon from "@/assets/icons/services/powerpoint-templates.svg";
import SocialMediaImages from "@/assets/icons/services/social-media-images.svg";
import WebAdsIcon from "@/assets/icons/services/web-ads.svg";
import CarWindowDecalsIcon from "@/assets/icons/services/car-window-decals.svg";
import CarMagnetIcon from "@/assets/icons/services/car-magnet.svg";
import WindowDecalIcon from "@/assets/icons/services/window-decal.svg";
import BillboardDesignIcon from "@/assets/icons/services/billboard-design.svg";

export const serviceThemes = {
	orange: {
		background: "bg-gradient-to-br from-[#FFF6E5] to-[#FFEBD6]",
		textColor: "text-[#E65C00]",
	},
	green: {
		background: "bg-gradient-to-br from-[#EBFFF1] to-[#D6FFE4]",
		textColor: "text-[#10A356]",
	},
	blue: {
		background: "bg-gradient-to-br from-[#EBF8FF] to-[#D6EDFF]",
		textColor: "text-[#0F4E80]",
	},
	"light-red": {
		background: "bg-gradient-to-br from-[#FFEBF4] to-[#FFD6E4]",
		textColor: "text-[#FF4D89]",
	},
	red: {
		background: "bg-gradient-to-br from-[#FFEBF4] to-[#FFD6E4]",
		textColor: "text-[#F43646]",
	},
	teal: {
		background: "bg-gradient-to-br from-[#E5FFF8] to-[#D6FFF4]",
		textColor: "text-[#12B288]",
	},
	pink: {
		background: "bg-gradient-to-br from-[#FEF5FF] to-[#FCE0FF]",
		textColor: "text-[#D845E5]",
	},
	purple: {
		background: "bg-gradient-to-br from-[#F4EDFF] to-[#E7D9FF]",
		textColor: "text-[#7D35C9]",
	},
} as const;

export const firstRow: Array<IServiceItem> = [
	{
		title: "Background removal",
		icon: BackgroundRemovalIcon,
		theme: "orange",
	},
	{
		title: "Blog images",
		icon: BlogImagesIcon,
		theme: "green",
	},
	{
		title: "Email Signatures",
		icon: EmailSignatureIcon,
		theme: "blue",
	},
	{
		title: "Illustrations",
		icon: IllustrationsIcon,
		theme: "red",
	},
	{
		title: "Infographics",
		icon: InfographicsIcon,
		theme: "teal",
	},
	{
		title: "Logo Design",
		icon: LogoDesignIcon,
		theme: "purple",
	},
	{
		title: "Powerpoint",
		icon: PowerpointTemplatesIcon,
		theme: "light-red",
	},
];

const secondRow: Array<IServiceItem> = [
	{
		title: "Social Media Images",
		icon: SocialMediaImages,
		theme: "blue",
	},
	{
		title: "Web Ads",
		icon: WebAdsIcon,
		theme: "pink",
	},
	{
		title: "Car Window Decals",
		icon: CarWindowDecalsIcon,
		theme: "purple",
	},
	{
		title: "Car Magnets",
		icon: CarMagnetIcon,
		theme: "orange",
	},
	{
		title: "Window Decal",
		icon: WindowDecalIcon,
		theme: "pink",
	},
	{
		title: "Billboard Design",
		icon: BillboardDesignIcon,
		theme: "orange",
	},
];

// const thirdRow: Array<IServiceItem> = [
// 	{
// 		title: "Book Covers",
// 	},
// 	{
// 		title: "Book Layouts",
// 	},
// 	{
// 		title: "Brochures",
// 	},
// 	{
// 		title: "Business Cards",
// 	},
// 	{
// 		title: "Flyers & Posters",
// 	},
// 	{
// 		title: "Labels",
// 	},
// 	{
// 		title: "Podcast Covers",
// 	},
// ];
//
// const fourthRow: Array<IServiceItem> = [
// 	{
// 		title: "Restaurant Menu's",
// 	},
// 	{
// 		title: "Signs & Banners",
// 	},
// 	{
// 		title: "T-shirt Design",
// 	},
// 	{
// 		title: "Car Door Decals",
// 	},
// 	{
// 		title: "GIF",
// 	},
// 	{
// 		title: "Packaging",
// 	},
// ];

export const services = [...firstRow, ...secondRow, ...firstRow, ...secondRow];
