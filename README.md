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

## Publish with Vercel

1. Import this GitHub repository in Vercel and set the production branch to `main`.
2. Use the repository root as the **Root Directory** and select **Vite** as the framework preset.
3. Set the **Build Command** to `npm run build` and the **Output Directory** to `dist`. The **Install Command** can remain at its default.
4. Deploy. No environment variables or additional Vercel configuration are required.

The Vite base path is `/` on Vercel and local builds, and automatically uses the repository subpath for GitHub Pages builds.

## Security and copyright

This is a static GitHub Pages site. Visitors can view and copy content delivered to their browsers; the site itself cannot authenticate visitors or prevent copying. The copyright notice identifies Sagar Traders' claim, but it cannot technically prevent reuse. Only publish photos, logos, and other content that Sagar Traders owns or has permission to use.

To protect the public site from unauthorized changes:

1. Secure the GitHub account that owns the repository with two-factor authentication or a passkey, and remove unknown account sessions and authorized applications.
2. In repository **Settings → Collaborators and teams**, remove anyone who should not have write or administrative access. Give collaborators the least privilege they need.
3. In **Settings → Rules → Rulesets**, create a ruleset targeting `main`. Require changes through pull requests, prevent force pushes and branch deletion, and do not allow bypasses for people who should not be able to publish. If approvals are required, configure a trusted reviewer so your own changes can still be merged.
4. In **Settings → Environments → github-pages**, restrict deployments to `main`. Add a required reviewer only if an authorized reviewer is available to approve each deployment.
5. In **Settings → Pages**, keep **GitHub Actions** as the publishing source. Review workflow changes before merging; the deploy job needs the narrowly scoped Pages and OIDC permissions declared in `.github/workflows/deploy.yml`.

GitHub account and repository settings must be changed by an authorized repository owner; workflow code cannot enforce those settings by itself.

## Site details

- Shop: Sagar Traders — plywood and hardware
- Address: Shop no 2, opposite Murli Nagar HP Petrol Pump, Karond, Bhopal
- Phone / WhatsApp: +91 87708 47424
- Supplied showroom, signage, logo, and product photos are stored in `public/images/`.
- The official Sagar Traders logo is used in the animated header and catalog feature.
- The product directory is available from the **Products** link and the **Browse products** button.
- Use the category dropdowns in product collections and the full catalogue to show one category at a time. Product cards are for browsing; use the separate contact links to make an enquiry.
- To add the upcoming item-gallery ZIP, put supported image files in the matching category folder under `src/product-images/`. The catalog reads images and display names from those folders on the next build. See `src/product-images/README.md` for category slugs and filename guidance.
- The home-page furniture inspiration cards use remote Unsplash photos; those require an internet connection.