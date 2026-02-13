/**
 * PostHog Webhook Endpoint
 *
 * Receives PostHog webhook payloads when `trial_started` fires,
 * and forwards them to the configured downstream webhook URL.
 *
 * PostHog Action Webhook setup:
 *   1. Go to PostHog > Data pipelines > Destinations > New destination
 *   2. Select "Webhook"
 *   3. URL: https://kapa99.com/api/posthog-webhook
 *   4. Filter: event_name = "trial_started"
 *
 * Required env vars:
 *   POSTHOG_WEBHOOK_SECRET  - Shared secret for verifying PostHog webhook requests
 */

import type { APIRoute } from "astro";

const DOWNSTREAM_WEBHOOK_URL = "https://kho.zo.space/api/kapa99-trial-webhook";

export const POST: APIRoute = async ({ request }) => {
	const webhookSecret = import.meta.env.POSTHOG_WEBHOOK_SECRET;

	// Verify the webhook secret if configured
	if (webhookSecret) {
		const authHeader = request.headers.get("authorization");
		if (authHeader !== `Bearer ${webhookSecret}`) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			});
		}
	}

	let payload: any;
	try {
		payload = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: "Invalid JSON" }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}

	// PostHog webhook payloads contain event data directly or in a `data` wrapper
	const eventData = payload.data || payload;
	const event = eventData.event;

	if (event !== "trial_started") {
		return new Response(JSON.stringify({ status: "ignored", event }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	}

	const properties = eventData.properties || {};
	const forwardPayload = {
		email: properties.email || eventData.distinct_id,
		source: properties.source || properties.utm_source || null,
		campaign: properties.campaign || properties.utm_campaign || null,
		timestamp: eventData.timestamp || new Date().toISOString(),
	};

	// Forward to downstream webhook
	try {
		const response = await fetch(DOWNSTREAM_WEBHOOK_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(forwardPayload),
		});

		return new Response(
			JSON.stringify({
				status: "forwarded",
				downstream_status: response.status,
			}),
			{
				status: 200,
				headers: { "Content-Type": "application/json" },
			}
		);
	} catch (err: any) {
		return new Response(
			JSON.stringify({
				status: "forward_failed",
				error: err.message,
			}),
			{
				status: 502,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
};

// Reject other methods
export const ALL: APIRoute = async () => {
	return new Response(JSON.stringify({ error: "Method not allowed" }), {
		status: 405,
		headers: { "Content-Type": "application/json" },
	});
};
