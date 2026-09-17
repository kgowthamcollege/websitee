# Amman Studios Gifts — React app

A React conversion of the original static HTML site, built with Vite,
split into pages and components.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## What's inside

```
src/
├── App.jsx              — top-level state + wiring, renders pages/components
├── main.jsx             — mounts App into #root, imports styles.css
├── styles.css           — all site CSS (was an inline <style> block)
├── data/
│   └── constants.js     — products, frame sizes, FAQs, categories, copy
├── components/          — reusable chrome, shown on every page
│   ├── Nav.jsx           top nav bar (logo, cart button, admin gear)
│   ├── Sidebar.jsx       glassmorphic slide-in menu
│   ├── BottomNav.jsx     fixed mobile bottom nav
│   ├── CartDrawer.jsx    slide-out cart + checkout options
│   ├── ChatWidget.jsx    chat FAB + panel
│   ├── AdminPanel.jsx    admin login + dashboard modal
│   ├── Footer.jsx        site footer
│   └── Splash.jsx        opening splash screen
└── pages/                — one file per section of the single-page site
    ├── Home.jsx           hero
    ├── Shop.jsx           product grid + custom frame size picker
    ├── UploadPage.jsx     photo upload + order form
    ├── Process.jsx        "how it works" + testimonials
    ├── Faq.jsx            FAQ accordion
    └── Contact.jsx        visit-us info + contact form
```

`App.jsx` owns all the state (cart, sidebar, splash, upload previews,
FAQ toggle, chat, admin) and passes it down as props — the pages and
components themselves are otherwise plain/presentational. Since the
original site is a single scrolling page rather than separate routes,
"pages" here means page *sections* (each still renders inside one
`<App>`, in order); nothing needs a router. If you want real
client-side routing later, `react-router-dom` drops in cleanly since
each page is already its own component.

## Changed from the original static HTML

- **Product photos**: the original embedded several megabytes of
  base64-encoded images directly in the HTML. Those were dropped in
  favor of the CSS gradient placeholders the page already used as a
  fallback. Add your own images by setting an `img` URL on each entry
  in `PRODUCTS` (in `src/data/constants.js`) and rendering it in
  `src/pages/Shop.jsx` instead of the gradient.
- **Razorpay / GPay / Supabase / jsPDF**: these need real API keys and
  a backend, which can't safely live in front-end code, so they're
  stubbed:
  - "Checkout via WhatsApp" and the upload/contact forms are fully
    wired — they build the same `wa.me` links as the original.
  - "Pay Now with Razorpay" shows a placeholder alert instead of
    pretending to charge a card. Wire this up to a Razorpay order
    endpoint on a server you control.
  - The UPI "Scan to Pay" box shows a placeholder QR graphic — replace
    it with a real QR code image in `src/components/CartDrawer.jsx`.
  - The admin dashboard reads from in-memory React state (cleared on
    refresh) instead of a Supabase database, and the password is
    hardcoded to `1234` as a placeholder. Replace with real auth
    before using this for anything real.
- **Chat widget**: replies are canned/keyword-matched instead of
  calling an LLM. Wire `sendMessage` in `App.jsx` up to your own
  backend to make it live — never call a model API with a secret key
  directly from the browser.

## Editable bits you'll likely want to change first

- `WHATSAPP_NUMBER` and `UPI_ID` in `src/data/constants.js`.
- `PRODUCTS`, `FRAME_SIZES`, `FAQS`, `CATEGORIES`, `PROCESS_STEPS`,
  `TESTIMONIALS` in the same file, for your own catalog and copy.
- The admin password check in `checkAdminPassword()` in `App.jsx`.
