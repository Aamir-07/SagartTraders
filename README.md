# Sagar Traders

A responsive storefront website for Sagar Traders, a plywood and hardware shop in Karond, Bhopal. Built with React, TypeScript, Vite, Motion, and Lucide icons.

## Run locally

```sh
npm install
npm run dev
```

Create and preview a production build with `npm run build` and `npm run preview`.

## Publish with GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys the site whenever changes are pushed to `main` (or when started manually from the Actions tab).

1. Push this project to a GitHub repository using the `main` branch.
2. In the repository, open **Settings → Pages** and set the build and deployment source to **GitHub Actions**.
3. Open **Actions** and confirm the **Deploy Sagar Traders site** workflow completes. GitHub displays the published address in the deployment summary.

The Vite build automatically uses the repository name as the GitHub Pages subpath. No custom domain is required.

## Site details

- Shop: Sagar Traders — plywood and hardware
- Address: Shop no 2, opposite Murli Nagar HP Petrol Pump, Karond, Bhopal
- Phone / WhatsApp: +91 87708 47424
- Supplied showroom, signage, logo, and product photos are stored in `public/images/`.
- The official Sagar Traders logo is used in the animated header and catalog feature.
- The product directory is available from the **Products** link and the **Browse products** button.
- To add the upcoming item-gallery ZIP, put supported image files in the matching category folder under `src/product-images/`. The catalog reads images and display names from those folders on the next build. See `src/product-images/README.md` for category slugs and filename guidance.
- The home-page furniture inspiration cards use remote Unsplash photos; those require an internet connection.