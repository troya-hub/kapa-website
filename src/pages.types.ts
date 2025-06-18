// Base types for different component types
interface BasePageable {
	id: number;
	created_at: string;
	updated_at: string;
	class_type: string;
}

interface PageHero extends BasePageable {
	title: string;
	description: string;
	image_url: string | null;
	button_text: string;
	button_href: string;
	type: string;
	background_color: string;
	request_email: boolean;
}

interface StaticPage extends BasePageable {
	title: string;
}

interface PageTextComponent extends BasePageable {
	title: string;
	description: string;
}

interface PageCallToAction extends BasePageable {
	title: string;
	subtitle: string;
	button_text: string;
	button_href: string;
	type: string;
}

interface PageTestimonial extends BasePageable {
	title: string;
}

interface PageCarousel extends BasePageable {
	title: string;
	size: string;
	tags: string;
}

interface PageFeatureBenefit extends BasePageable {
	title: string;
	subtitle: string;
	image_url: string;
	image_direction: string;
	body: string;
}

// Feature comparison types
interface FeatureValue {
	type: "CHECKBOX" | "TEXT";
	value: boolean | string;
}

interface FeatureRow {
	text: string;
	value1: FeatureValue;
	value2: FeatureValue;
}

interface FeatureSection {
	name: string;
	rows: FeatureRow[];
}

interface PageFeature extends BasePageable {
	title: string;
	first_company: string;
	second_company: string;
	value: FeatureSection[];
	description: string;
}

// Union type for all possible pageable types
type PageableContent =
	| PageHero
	| StaticPage
	| PageTextComponent
	| PageCallToAction
	| PageTestimonial
	| PageCarousel
	| PageFeatureBenefit
	| PageFeature;

// Component interface
interface PageComponent {
	id: number;
	page_id: number;
	pageable_id: number;
	pageable_type: string;
	order: number;
	created_at: string;
	updated_at: string;
	pageable: unknown;
}

// Main page interface
interface Page {
	id: number;
	title: string;
	slug: string;
	meta_description: string;
	meta_keywords: string;
	enabled: boolean;
	order: number;
	created_at: string;
	updated_at: string;
	simple_footer: boolean;
	components: PageComponent[];
}

// API response interface
interface PagesApiResponse {
	pages: Page[];
}

// Constants for pageable types
export const PAGEABLE_TYPES = {
	PAGE_HERO: "App\\Models\\PageHero",
	STATIC_PAGE: "App\\Models\\StaticPage",
	PAGE_TEXT_COMPONENT: "App\\Models\\PageTextComponent",
	PAGE_CALL_TO_ACTION: "App\\Models\\PageCallToAction",
	PAGE_TESTIMONIAL: "App\\Models\\PageTestimonial",
	PAGE_CAROUSEL: "App\\Models\\PageCarousel",
	PAGE_FEATURE_BENEFIT: "App\\Models\\PageFeatureBenefit",
	PAGE_FEATURE: "App\\Models\\PageFeature",
} as const;

// Export all types
export type {
	Page,
	PageComponent,
	PageableContent,
	PageHero,
	StaticPage,
	PageTextComponent,
	PageCallToAction,
	PageTestimonial,
	PageCarousel,
	PageFeatureBenefit,
	PageFeature,
	FeatureSection,
	FeatureRow,
	FeatureValue,
	PagesApiResponse,
};
