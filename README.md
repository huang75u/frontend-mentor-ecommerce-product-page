# Sneakers — E-commerce product page

A completed [Frontend Mentor challenge](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6), implemented with semantic HTML, responsive CSS and vanilla JavaScript.

## Run locally

Requires Node.js 18 or later. No dependency installation or build step is required.

```sh
npm start
```

Open http://127.0.0.1:4173. `npm run check` checks JavaScript syntax. The static files also work on GitHub Pages.

## Features

- Responsive desktop gallery and mobile image navigation.
- Four thumbnails, synchronized enlarged gallery, previous/next controls and keyboard arrows.
- Native modal dialogs with Escape dismissal, focus containment and focus restoration.
- Mobile navigation drawer.
- Quantity selection (0–99), repeated add-to-cart, total calculation, cart badge and removal.
- Empty-cart state, outside-click dismissal, visible keyboard focus and live feedback.

## Scope

This is a frontend practice project, not a functioning store. Checkout displays a demo notice. Cart state is held in memory and resets on reload. Header categories refer to the single product; About links to the attribution and Contact to Frontend Mentor. No payment, account, catalogue or backend is implemented.

## Verification

Browser checks performed in Chrome on 2026-09-29:

- Zero quantity cannot be added; decrement is disabled at zero.
- Adding two pairs twice yields four pairs and a $500.00 total.
- Removing the product restores the empty-cart state.
- Enlarged gallery switches images; Escape closes it and returns focus to its trigger.
- Mobile menu opens and closes with Escape; mobile next-image control switches the photo.
- Mobile layout visually inspected at 375 px; 320 px has no horizontal overflow.

## Files

- `index.html`: page structure and native dialogs.
- `styles.css`: responsive layout, states and styling.
- `app.js`: gallery, quantity and cart behavior.
- `scripts/serve.cjs`: dependency-free local preview server.
- `images/`, `design/`, `style-guide.md`: supplied challenge assets and references.

## Credits

Design and supplied imagery: Frontend Mentor. Font: Kumbh Sans via Google Fonts. Implementation created with AI assistance for huang75u. Supplied challenge assets remain subject to their original terms; no additional rights to those assets are granted by this repository.
