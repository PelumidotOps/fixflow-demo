# FixFlow

FixFlow is a client presentation demo for a home HVAC service business. It connects a service website, a three-step customer booking journey, and an operations dashboard to show how a small service team can present its services and manage incoming requests.

## Walkthrough

1. Open `/demo` for the guided overview.
2. Choose a service at `/book`, select a future date and time, and enter fictional contact details.
3. Open `/admin/bookings` on the same browser to see the request and change its status.
4. Explore sample jobs, scheduling, technicians, invoices and analytics.

## Demo scope

Requests are saved in browser local storage; drafts are saved in session storage. Sample reviews, prices, team members and business records are illustrative. The demo does not send notifications, dispatch technicians, process payments or protect the admin pages with authentication. Use fictional information only. Production would need a shared database, staff authentication, availability management, notification and payment integrations.

## Development

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Build with `npm run build` and serve with `npm start`. Deploy to Vercel using its Next.js defaults; no environment variables are needed for the demo.
