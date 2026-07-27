# Portfolio — Syed Moin Hussain

Single-page personal portfolio site. Static HTML/CSS/JS, no build step, deployable directly via GitHub Pages or any static host.

## File structure

```
portfolio/
├── index.html                  # the single page
├── css/
│   └── style.css               # all styling (design tokens at top of file)
├── js/
│   └── script.js               # typed terminal effect, gallery carousel, lightbox, footer year
├── assets/
│   └── images/
│       ├── cover photo.png             # book cover — shown on the Chipku project card, links to Amazon
│       ├── image 1.png                 # illustrations 1–19 — power the gallery slideshow
│       ├── image 2.png
│       ├── ...
│       ├── image 19.png
│       └── projects/                   # unused placeholder folder, safe to delete
├── resume/
│   └── Syed_Moin_Hussain_Resume.pdf   # <-- add your resume PDF here
└── README.md
```

## Before you deploy — things to fill in

1. **`resume/Syed_Moin_Hussain_Resume.pdf`** — the folder exists but is empty. Export your resume as a PDF and drop it in here with that exact filename (or update the links in `index.html`).
2. **Email address** — in `index.html`, find `mailto:youremail@example.com` and replace with your real email.
3. **Breathing Bot live link** — in `index.html`, find `data-placeholder="render-url"` and replace the `href="#"` on that link with your actual Render URL.
4. **Adding/removing illustrations** — the gallery is a slideshow generated from `js/script.js`. It expects files named exactly `image 1.png` through `image 19.png` in `assets/images/`. If you add or remove images, update the `TOTAL_ILLUSTRATIONS` number at the top of `script.js` to match your actual count.
5. Avoid `.tif` files — browsers don't reliably render TIFF. Re-export as `.jpg` or `.png` if that's your only version.
6. The cover image (`cover photo.png`) on the Chipku card is a clickable link straight to your Amazon listing — no extra setup needed, just make sure the file exists at that path.

## Deploying with GitHub Pages

**Option A — project site (repo name can be anything):**
1. Push this folder to a new GitHub repo, e.g. `portfolio`.
2. Go to the repo's **Settings → Pages**.
3. Under "Build and deployment", set **Source: Deploy from a branch**, branch: `main`, folder: `/ (root)`.
4. Your site will be live at `https://<your-username>.github.io/portfolio/`.

**Option B — user site (root domain, no sub-path):**
1. Create a repo named exactly `<your-username>.github.io` (e.g. `syedmoinhussain9.github.io`).
2. Push this folder's contents to the root of that repo.
3. Enable Pages the same way as above (branch `main`, folder `/root`).
4. Your site will be live at `https://<your-username>.github.io/`.

## Using a custom domain instead

If you buy a domain later:
1. Add a file named `CNAME` (no extension) to the repo root containing just your domain, e.g. `moinhussain.dev`.
2. Point your domain's DNS to GitHub Pages (an `A` record to GitHub's IPs, or a `CNAME` record to `<username>.github.io` if using a subdomain).
3. GitHub's Pages settings will show a "your custom domain" field — enter it there too.

Full instructions: https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site