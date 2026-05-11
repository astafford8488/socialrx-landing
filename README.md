# SocialRx Landing Page

Marketing site for **SocialRx** — done-for-you social media management built exclusively for physicians. SocialRx handles content creation, posting, and ad management so doctors can focus on patient care.

**Live site:** [socialrx.biz](https://socialrx.biz)

## Tech Stack

- Static HTML
- Tailwind CSS (CDN)
- Google Fonts
- Responsive mobile-first design

## Pages

| File | Description |
|------|-------------|
| `index.html` | Landing page with service overview, credibility stats, and booking CTA |
| `confirm.html` | Post-booking confirmation with embedded video |
| `privacy.html` | Privacy policy |

## Local Development

No build step required. Open `index.html` directly in a browser or use any static file server:

```bash
npx serve .
```

## Deployment

Deployed to **Cloudflare Pages** with custom domain `socialrx.biz`.

Security headers are configured in `_headers`. Crawling rules are in `robots.txt`.

## License

MIT
