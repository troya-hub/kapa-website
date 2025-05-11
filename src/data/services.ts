import type { IServiceItem } from "@/types";
import BackgroundRemovalIcon from "@/assets/icons/services/background-removal.svg?url";
import BlogImagesIcon from "@/assets/icons/services/blog-images.svg?url";
import EmailSignatureIcon from "@/assets/icons/services/email-signatures.svg?url";
import IllustrationsIcon from "@/assets/icons/services/illustrations.svg?url";
import InfographicsIcon from "@/assets/icons/services/infographics.svg?url";
import LogoDesignIcon from "@/assets/icons/services/logo-design.svg?url";
import PowerpointTemplatesIcon from "@/assets/icons/services/powerpoint-templates.svg?url";
import SocialMediaImages from "@/assets/icons/services/social-media-images.svg?url";
import WebAdsIcon from "@/assets/icons/services/web-ads.svg?url";
import CarWindowDecalsIcon from "@/assets/icons/services/car-window-decals.svg?url";
import CarMagnetIcon from "@/assets/icons/services/car-magnet.svg?url";
import WindowDecalIcon from "@/assets/icons/services/window-decal.svg?url";
import BillboardDesignIcon from "@/assets/icons/services/billboard-design.svg?url";
import BookCoversIcon from "@/assets/icons/services/book-covers.svg?url";
import BookLayoutsIcon from "@/assets/icons/services/book-layouts.svg?url";
import BrochuresIcon from "@/assets/icons/services/brochures.svg?url";
import BusinessCardsIcon from "@/assets/icons/services/business-cards.svg?url";
import FlyersPostersIcon from "@/assets/icons/services/flyers-and-posters.svg?url";
import LabelsIcon from "@/assets/icons/services/labels.svg?url";
import PodcastCoversIcon from "@/assets/icons/services/podcast-covers.svg?url";
import RestaurantMenus from "@/assets/icons/services/restaurant-menus.svg?url";
import SignsBannersIcon from "@/assets/icons/services/signs-and-banners.svg?url";
import TShirtDesignIcon from "@/assets/icons/services/t-shirt-design.svg?url";
import CarDoorDecalsIcon from "@/assets/icons/services/car-door-decals.svg?url";
import GIFIcon from "@/assets/icons/services/gif.svg?url";
import PackagingIcon from "@/assets/icons/services/packaging.svg?url";

import BrandingImage from "@/assets/images/services/branding.webp?url";
import IllustrationsImage from "@/assets/images/services/illustrations.webp?url";
import BusinessCardsImage from "@/assets/images/services/business-cards.webp?url";
import BillBoardsImage from "@/assets/images/services/billboards.webp?url";

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

// Extracting items as individual variables
const backgroundRemoval: IServiceItem = {
	title: "Background removal",
	icon: BackgroundRemovalIcon,
	theme: "orange",
};

const blogImages: IServiceItem = {
	title: "Blog images",
	icon: BlogImagesIcon,
	theme: "green",
};

const emailSignatures: IServiceItem = {
	title: "Email Signatures",
	icon: EmailSignatureIcon,
	theme: "blue",
};

const illustrations: IServiceItem = {
	title: "Illustrations",
	icon: IllustrationsIcon,
	theme: "red",
};

const infographics: IServiceItem = {
	title: "Infographics",
	icon: InfographicsIcon,
	theme: "teal",
};

const logoDesign: IServiceItem = {
	title: "Logo Design",
	icon: LogoDesignIcon,
	theme: "purple",
};

const powerpoint: IServiceItem = {
	title: "Powerpoint",
	icon: PowerpointTemplatesIcon,
	theme: "light-red",
};

const socialMediaImages: IServiceItem = {
	title: "Social Media Images",
	icon: SocialMediaImages,
	theme: "blue",
};

const webAds: IServiceItem = {
	title: "Web Ads",
	icon: WebAdsIcon,
	theme: "pink",
};

const carWindowDecals: IServiceItem = {
	title: "Car Window Decals",
	icon: CarWindowDecalsIcon,
	theme: "purple",
};

const carMagnets: IServiceItem = {
	title: "Car Magnets",
	icon: CarMagnetIcon,
	theme: "orange",
};

const windowDecal: IServiceItem = {
	title: "Window Decal",
	icon: WindowDecalIcon,
	theme: "pink",
};

const billboardDesign: IServiceItem = {
	title: "Billboard Design",
	icon: BillboardDesignIcon,
	theme: "orange",
};

const bookCovers: IServiceItem = {
	title: "Book Covers",
	icon: BookCoversIcon,
	theme: "purple",
};

const bookLayouts: IServiceItem = {
	title: "Book Layouts",
	icon: BookLayoutsIcon,
	theme: "green",
};

const brochures: IServiceItem = {
	title: "Brochures",
	icon: BrochuresIcon,
	theme: "light-red",
};

const businessCards: IServiceItem = {
	title: "Business Cards",
	icon: BusinessCardsIcon,
	theme: "purple",
};

const flyersPosters: IServiceItem = {
	title: "Flyers & Posters",
	icon: FlyersPostersIcon,
	theme: "blue",
};

const labels: IServiceItem = {
	title: "Labels",
	icon: LabelsIcon,
	theme: "red",
};

const podcastCovers: IServiceItem = {
	title: "Podcast Covers",
	icon: PodcastCoversIcon,
	theme: "green",
};

const restaurantMenus: IServiceItem = {
	title: "Restaurant Menu's",
	icon: RestaurantMenus,
	theme: "orange",
};

const signsBanners: IServiceItem = {
	title: "Signs & Banners",
	icon: SignsBannersIcon,
	theme: "blue",
};

const tShirtDesign: IServiceItem = {
	title: "T-shirt Design",
	icon: TShirtDesignIcon,
	theme: "red",
};

const carDoorDecals: IServiceItem = {
	title: "Car Door Decals",
	icon: CarDoorDecalsIcon,
	theme: "teal",
};

const gif: IServiceItem = {
	title: "GIF",
	icon: GIFIcon,
	theme: "blue",
};

const packaging: IServiceItem = {
	title: "Packaging",
	icon: PackagingIcon,
	theme: "green",
};

// Updated arrays using variable references instead of object literals
export const firstServicesRow: Array<IServiceItem> = [
	backgroundRemoval,
	blogImages,
	emailSignatures,
	illustrations,
	infographics,
	logoDesign,
	powerpoint,

	socialMediaImages,
	webAds,
	carWindowDecals,
	carMagnets,
	windowDecal,
	billboardDesign,

	bookCovers,
	bookLayouts,
	brochures,
	businessCards,
	flyersPosters,
	labels,
	podcastCovers,

	restaurantMenus,
	signsBanners,
	tShirtDesign,
	carDoorDecals,
	gif,
	packaging,
];

export const secondServicesRow: Array<IServiceItem> = [
	podcastCovers,
	restaurantMenus,
	signsBanners,
	tShirtDesign,
	carDoorDecals,
	gif,
	packaging,

	billboardDesign,
	bookCovers,
	bookLayouts,
	brochures,
	businessCards,
	flyersPosters,
	labels,

	powerpoint,
	socialMediaImages,
	webAds,
	carWindowDecals,
	carMagnets,
	windowDecal,
	billboardDesign,

	backgroundRemoval,
	blogImages,
	emailSignatures,
	illustrations,
	infographics,
	logoDesign,
	powerpoint,
];

const halfServices = [
	{
		alt: "Branding",
		image: BrandingImage,
	},
	{
		alt: "Illustrations",
		image: IllustrationsImage,
	},
	{
		alt: "Business Cards",
		image: BusinessCardsImage,
	},
	{
		alt: "Billboards",
		image: BillBoardsImage,
	},
];

export const services = [...halfServices, ...halfServices];
