# PostHog Analytics Setup for Kapa99

## 1. Environment Variables

Copy `.env.example` to `.env` and fill in your PostHog credentials:

```bash
cp .env.example .env
```

Get your API key from: **PostHog > Settings > Project > Project API Key**

| Variable | Where Used | Description |
|---|---|---|
| `PUBLIC_POSTHOG_API_KEY` | Client-side (browser) | PostHog project API key |
| `PUBLIC_POSTHOG_HOST` | Client-side (browser) | PostHog instance URL |
| `POSTHOG_API_KEY` | Server-side (webhook) | Same key, for server-side capture |
| `POSTHOG_WEBHOOK_SECRET` | Webhook endpoint | Shared secret for webhook auth |

For Cloudflare deployment, set these in your Cloudflare Pages environment variables.

---

## 2. Events Tracked

### Client-side (marketing site - kapa99.com)

| Event | Trigger | Properties |
|---|---|---|
| `page_viewed` | Every page load | `page`, `referrer`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` |
| `cta_clicked` | Click on any "Start free trial" button | `cta_name`, `destination`, `plan`, `page`, UTM params |

### Server-side (app backend - app.kapa99.com)

These events should be fired from your app backend using `src/lib/posthog-server.ts`:

| Event | Trigger | Properties |
|---|---|---|
| `trial_started` | User completes registration | `email`, `source`, `campaign`, `referrer` |
| `trial_converted` | Trial user upgrades to paid | `email`, `plan`, `trial_duration_days` |
| `trial_churned` | Trial expires without converting | `email`, `trial_duration_days`, `last_active_date` |

**Backend integration example:**

```typescript
import { trackTrialStarted, trackTrialConverted, trackTrialChurned } from "./lib/posthog-server";

// When user signs up for trial
await trackTrialStarted({
  email: user.email,
  source: utmParams.utm_source,
  campaign: utmParams.utm_campaign,
  referrer: request.headers.get("referer"),
});

// When trial converts to paid
await trackTrialConverted({
  email: user.email,
  plan: "Async Standard",
  trial_duration_days: 12,
});

// When trial expires (run via cron job)
await trackTrialChurned({
  email: user.email,
  trial_duration_days: 15,
  last_active_date: "2025-01-10",
});
```

---

## 3. Dashboard Setup

Create these insights in PostHog (**Dashboards > New Dashboard**):

### Insight 1: Daily Trial Signups (Line Chart)

- **Type**: Trends
- **Event**: `trial_started`
- **Aggregation**: Total count
- **Date range**: Last 30 days
- **Interval**: Day

### Insight 2: Trial Conversion Rate (Number)

- **Type**: Trends
- **Formula mode**: `A / B * 100`
  - **A**: `trial_converted` — unique users
  - **B**: `trial_started` — unique users
- **Date range**: Last 30 days

### Insight 3: Top Traffic Sources (Table)

- **Type**: Trends
- **Event**: `trial_started`
- **Breakdown by**: `source` property
- **Display**: Table
- **Date range**: Last 30 days

### Insight 4: Conversion Funnel

- **Type**: Funnel
- **Steps**:
  1. `page_viewed` (where `page` = `/` or `/pricing`)
  2. `cta_clicked`
  3. `trial_started`
  4. `trial_converted`
- **Date range**: Last 30 days
- **Conversion window**: 30 days

---

## 4. Webhook Setup (PostHog → kho.zo.space)

When `trial_started` fires, it can be forwarded to your external webhook.

### Option A: Direct PostHog Webhook (recommended)

1. Go to **PostHog > Data pipelines > Destinations > New destination**
2. Select **Webhook**
3. **URL**: `https://kho.zo.space/api/kapa99-trial-webhook`
4. **Method**: POST
5. **Headers**: `Content-Type: application/json`
6. **Body template**:
   ```json
   {
     "email": "{person.properties.email}",
     "source": "{event.properties.source}",
     "campaign": "{event.properties.campaign}",
     "timestamp": "{event.timestamp}"
   }
   ```
7. **Filters**: Match event `trial_started`

### Option B: Via Kapa99 Webhook Proxy

This uses the `/api/posthog-webhook` endpoint on this site as a proxy:

1. Go to **PostHog > Data pipelines > Destinations > New destination**
2. Select **Webhook**
3. **URL**: `https://kapa99.com/api/posthog-webhook`
4. **Headers**: `Authorization: Bearer YOUR_WEBHOOK_SECRET`
5. **Filters**: Match event `trial_started`

The endpoint will extract the relevant fields and forward to `https://kho.zo.space/api/kapa99-trial-webhook`.

---

## 5. File Reference

| File | Purpose |
|---|---|
| `src/scripts/posthog.ts` | Client-side PostHog init, page view tracking, CTA click tracking |
| `src/lib/posthog-server.ts` | Server-side event capture (for app backend) |
| `src/pages/api/posthog-webhook.ts` | Webhook proxy endpoint |
| `src/components/landing/Analytics.astro` | Loads PostHog alongside other analytics |
| `.env.example` | Environment variable template |
