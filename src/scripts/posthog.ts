import posthog from "posthog-js";

const POSTHOG_API_KEY = import.meta.env.PUBLIC_POSTHOG_API_KEY;
const POSTHOG_HOST = import.meta.env.PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

let initialized = false;

export function initPostHog() {
	if (initialized || !POSTHOG_API_KEY) return;

	posthog.init(POSTHOG_API_KEY, {
		api_host: POSTHOG_HOST,
		capture_pageview: false, // We manually track page views with UTM params
		capture_pageleave: true,
		persistence: "localStorage+cookie",
	});

	initialized = true;
	trackPageView();
	setupCTATracking();
}

function getUTMParams(): Record<string, string> {
	const params = new URLSearchParams(window.location.search);
	const utm: Record<string, string> = {};

	const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
	for (const key of utmKeys) {
		const value = params.get(key);
		if (value) utm[key] = value;
	}

	return utm;
}

function trackPageView() {
	const utmParams = getUTMParams();

	posthog.capture("page_viewed", {
		page: window.location.pathname,
		referrer: document.referrer || undefined,
		...utmParams,
	});

	// Register UTM params as super properties so they persist across events
	if (Object.keys(utmParams).length > 0) {
		posthog.register(utmParams);
	}
}

function setupCTATracking() {
	document.addEventListener("click", (e) => {
		const link = (e.target as HTMLElement).closest("a");
		if (!link) return;

		const href = link.getAttribute("href") || "";
		const isTrialCTA =
			href.includes("app.kapa99.com/register") ||
			(href === "/pricing" && link.classList.contains("button-primary")) ||
			(href === "/pricing" && link.classList.contains("button-secondary"));

		if (!isTrialCTA) return;

		// Extract plan from URL if present
		const planMatch = href.match(/plan=(price_[^&]+)/);

		trackCTAClick(
			link.textContent?.trim() || "Start free trial",
			href,
			planMatch?.[1]
		);
	});
}

export function trackCTAClick(ctaName: string, destination: string, plan?: string) {
	posthog.capture("cta_clicked", {
		cta_name: ctaName,
		destination,
		plan: plan || undefined,
		page: window.location.pathname,
		...getUTMParams(),
	});
}

// For use on app.kapa99.com backend — included here as reference.
// These events should be fired server-side when the actual actions occur.
export type TrialEvent =
	| {
			event: "trial_started";
			properties: {
				email: string;
				source?: string;
				campaign?: string;
				referrer?: string;
			};
	  }
	| {
			event: "trial_converted";
			properties: {
				email: string;
				plan: string;
				trial_duration_days: number;
			};
	  }
	| {
			event: "trial_churned";
			properties: {
				email: string;
				trial_duration_days: number;
				last_active_date: string;
			};
	  };
