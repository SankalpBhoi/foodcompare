# FoodCompare — Frontend Demo

A responsive SaaS landing page and food-price comparison interface concept, built for the Sankar Group Front-End Development Internship assignment.

## Technologies
- HTML5
- CSS3 (Grid, Flexbox, media queries, animations)
- Vanilla JavaScript
- Browser Geolocation API
- OpenStreetMap Nominatim reverse geocoding demo
- Bootstrap Icons and Google Fonts

## Run locally
1. Extract the ZIP.
2. Open the folder in VS Code.
3. Run `index.html` using the Live Server extension.
4. Allow location permission to test browser geolocation. If permission is denied, enter a city, area or pincode manually.

Use localhost or HTTPS for geolocation.

## Assignment requirements covered
- Navigation bar with product logo, section links and Get Started CTA.
- Hero section with product headline, description, CTAs and food imagery.
- Three feature cards: full bill comparison, coupon finder and location-aware discovery.
- About / How it works section explaining the three-step user journey.
- Pricing section with two plans: Free and FoodCompare Plus at ₹39/month.
- Contact / early-access form with name, email and plan selection.
- Footer with navigation and project disclaimer.
- Navigation links scroll to the corresponding sections.
- Buttons scroll to sections, open location selection or preselect a plan.
- Contact form validates inputs and displays a success message.
- Responsive desktop and mobile layouts.
- Consistent typography, spacing, colour palette and visual hierarchy.

## Product functionality
- Browser location permission request and approximate reverse geocoding.
- Manual city, area or pincode entry.
- Search by dish, restaurant or category.
- Sort by recommended, lowest sample total or highest sample savings.
- Compare sample platform food prices, delivery fees, platform fees and coupon discounts.
- Calculate the sample final payable amount and recommend the lowest illustrative total.
- Open the selected platform's official homepage in a new tab.
- Scroll reveal animations and mobile navigation.

## Important demo limitations
- Food, restaurant, fee, discount and coupon data are sample data in `script.js`; they are not live Swiggy, Zomato or Magicpin data.
- Order buttons currently open the selected platform's official homepage, not a guaranteed matching cart or product page.
- Location detection and reverse geocoding do not verify which restaurants or delivery platforms serve the address.
- Pricing is illustrative for the assignment; no payment is collected.
- The contact form is front-end only and does not send or store user data.
- For production use, integrate authorized platform/partner APIs or other permitted data sources.

## Suggested interview explanation
I built FoodCompare as a responsive SaaS landing page and food-price comparison interface. It helps users compare the complete order cost across delivery services instead of comparing menu prices alone. The browser Geolocation API requests the user's location, with manual location entry as a fallback. JavaScript filters sample food data and calculates final amounts using food price, delivery fee, platform fee and coupon discount. The page includes three feature cards, a how-it-works section, two pricing plans and a validated contact form. I used semantic HTML, CSS Grid and Flexbox for responsive layouts, and vanilla JavaScript for search, sorting, location handling and form interactions. Live commercial menu and coupon data would require authorized integrations.

## Project structure
- `index.html` — page structure
- `style.css` — design and responsive styling
- `script.js` — demo data and interactions
- `README.md` — setup and project notes
