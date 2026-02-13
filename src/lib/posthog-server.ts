/**
 * Server-side PostHog event tracking.
 *
 * Use this module on your app backend (app.kapa99.com) to track trial lifecycle
 * events that can't be captured from the marketing site.
 *
 * Required env vars:
 *   POSTHOG_API_KEY    - Your PostHog project API key
 *   POSTHOG_HOST       - PostHog instance URL (default: https://us.i.posthog.com)
 */

const POSTHOG_API_KEY = typeof process !== "undefined"
	? process.env.POSTHOG_API_KEY
	: (import.meta as any).env?.POSTHOG_API_KEY;

const POSTHOG_HOST = typeof process !== "undefined"
	? process.env.POSTHOG_HOST || "https://us.i.posthog.com"
	: (import.meta as any).env?.POSTHOG_HOST || "https://us.i.posthog.com";

interface CapturePayload {
	event: string;
	distinct_id: string;
	properties?: Record<string, unknown>;
}

async function capture(payload: CapturePayload): Promise<void> {
	if (!POSTHOG_API_KEY) {
		console.warn("[PostHog] Missing API key, skipping event:", payload.event);
		return;
	}

	await fetch(`${POSTHOG_HOST}/capture/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			api_key: POSTHOG_API_KEY,
			...payload,
		}),
	});
}

export async function trackTrialStarted(data: {
	email: string;
	source?: string;
	campaign?: string;
	referrer?: string;
}) {
	await capture({
		event: "trial_started",
		distinct_id: data.email,
		properties: {
			email: data.email,
			source: data.source,
			campaign: data.campaign,
			referrer: data.referrer,
		},
	});
}

export async function trackTrialConverted(data: {
	email: string;
	plan: string;
	trial_duration_days: number;
}) {
	await capture({
		event: "trial_converted",
		distinct_id: data.email,
		properties: {
			email: data.email,
			plan: data.plan,
			trial_duration_days: data.trial_duration_days,
		},
	});
}

export async function trackTrialChurned(data: {
	email: string;
	trial_duration_days: number;
	last_active_date: string;
}) {
	await capture({
		event: "trial_churned",
		distinct_id: data.email,
		properties: {
			email: data.email,
			trial_duration_days: data.trial_duration_days,
			last_active_date: data.last_active_date,
		},
	});
}
