export const WHATSAPP_NUMBER = "918682001729"; // no + or spaces
export const UPI_ID = "8682001729@pthdfc";

export const PRODUCTS = [
  { id: "mug", cat: "Drinkware", name: "Photo Mug", price: 349, gradient: "linear-gradient(135deg,#C85A45,#E9DBC4)", image: "/assets/photo-mug.jpeg" },
  { id: "canvas", cat: "Wall Art", name: "Canvas Print (12x18)", price: 1299, gradient: "linear-gradient(135deg,#8A9A7E,#E9DBC4)" },
  { id: "keychain", cat: "Accessories", name: "Photo Keychain", price: 199, gradient: "linear-gradient(135deg,#C99A47,#FAF6EF)", image: "/assets/keychain-photo.jpeg" },
  { id: "cushion", cat: "Home", name: "Photo Cushion Cover", price: 549, gradient: "linear-gradient(135deg,#E9DBC4,#8A9A7E)", image: "/assets/photo-cushion-cover.jpeg" },
  { id: "photobook", cat: "Keepsakes", name: "Personalized Photo Book", price: 1099, gradient: "linear-gradient(135deg,#C85A45,#C99A47)" },
];

export const FRAME_SIZES = [
  { size: "8x6", frame: 250, glass: 500 },
  { size: "10x8", frame: 400, glass: 750 },
  { size: "12x8", frame: 450, glass: 800 },
  { size: "12x10", frame: 550, glass: 850 },
  { size: "15x10", frame: 650, glass: 950 },
  { size: "15x12", frame: 750, glass: 1050 },
  { size: "12x18", frame: 950, glass: 1200 },
  { size: "20x16", frame: null, glass: 1500 },
];

export const FAQS = [
  { q: "How do I place an order?", a: 'Pick a product in the Shop section and tap "Add to cart." When you\'re ready, open the cart and choose "Checkout via WhatsApp" or "Pay Now with Razorpay" for instant online payment.' },
  { q: "How do I pay?", a: `Two ways: pay instantly with Razorpay (card, UPI, netbanking) right on the site, or checkout via WhatsApp and pay by UPI to ${UPI_ID} — we'll confirm and send a receipt either way.` },
  { q: "How does the photo frame sizing work?", a: 'In the Custom Photo Frame card, tap a size button to see two prices — "Frame Only" on the left and "Glass + Frame" on the right — then add whichever you want to the cart.' },
  { q: "How long does delivery take?", a: "48 hours within Chennai, and 3–5 days for shipping across India." },
  { q: "How do I send my photo?", a: "Once you've placed your order, share the photo with us on WhatsApp — we print, quality-check, and gift-wrap on request before shipping." },
  { q: "Can I order in bulk for a company or event?", a: "Yes — bulk and corporate gifting is available. Reach out via the contact form or WhatsApp and we'll quote based on quantity." },
  { q: "Still have a question?", a: "Ask our chat assistant (bottom right) any time, or reach us directly at +91 86820 01729." },
];

export const CATEGORIES = ["Photo Mug", "Custom Wooden Frame", "Photo Keychain", "Photo Cushion Cover", "Photo Book", "Canvas Print"];

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "shop", label: "Shop" },
  { id: "upload", label: "Upload Photos" },
  { id: "process", label: "How It Works" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export const PROCESS_STEPS = [
  ["01", "Choose a product", "Mug, canvas, frame, cushion or photo book — pick what fits the moment."],
  ["02", "Upload your photo", "Send us the picture via WhatsApp or the order form after checkout."],
  ["03", "We print & pack", "Printed in-house in Chennai, quality-checked, gift-wrapped on request."],
  ["04", "Delivered to you", "48-hour turnaround in Chennai, 3–5 days pan-India shipping."],
];

export const TESTIMONIALS = [
  ["Ordered a photo book for my parents' anniversary — the print quality made it feel like a real album.", "Divya, Chennai"],
  ["The mug arrived in two days flat, exactly as previewed. Will order again for Diwali gifts.", "Ramesh, Coimbatore"],
  ["Asked their chat assistant for a housewarming idea and the canvas print suggestion was perfect.", "Priya, Bengaluru"],
];

export const UPLOAD_PRODUCT_OPTIONS = [
  "Photo Mug (₹349)",
  "Canvas Print 12x18 (₹1299)",
  "Custom Wooden Frame (₹699)",
  "Photo Keychain (₹199)",
  "Photo Cushion Cover (₹549)",
  "Personalized Photo Book (₹1099)",
  "Custom Photo Frame (size)",
  "Other / Custom",
];

export const QUICK_REPLIES = [
  "Suggest a gift for my mom's birthday under 1000 rupees",
  "I want to place a custom photo book order",
  "How long does delivery take?",
];

export function currency(n) {
  return `₹${n.toLocaleString("en-IN")}`;
}
