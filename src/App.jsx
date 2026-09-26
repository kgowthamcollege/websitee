import React, { useState, useRef, useEffect } from "react";

import Splash from "./components/Splash";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";
import CartDrawer from "./components/CartDrawer";
import ChatWidget from "./components/ChatWidget";
import AdminPanel from "./components/AdminPanel";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import UploadPage from "./pages/UploadPage";
import Process from "./pages/Process";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";

import { WHATSAPP_NUMBER, currency } from "./data/constants";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, clearAdminData, saveInquiry, saveOrder, subscribeToAdminData } from "./firebase";

/**
 * Amman Studios Gifts — React conversion
 * -----------------------------------------------------------
 * This file only holds top-level state and wiring; the markup lives in
 * src/pages/* (one file per page/section) and src/components/* (reusable
 * chrome: nav, sidebar, cart drawer, chat widget, admin panel, footer).
 *
 * Notes on what changed vs. the original static HTML file:
 *  - All vanilla-JS state (cart, sidebar, splash, upload previews,
 *    FAQ toggles, chat) is now React state, owned here and passed down
 *    as props.
 *  - The huge embedded base64 product photos were dropped (they were
 *    multiple megabytes of inline data) and replaced with the same CSS
 *    gradient placeholders the page already used as a fallback. Swap in
 *    real image URLs via the `gradient`/`img` fields in src/data/constants.js.
 *  - Razorpay / GPay / jsPDF still need payment integrations, so those
 *    controls remain placeholders. Orders and inquiries persist to
 *    Firebase before their WhatsApp confirmation links are opened.
 *  - The AI chat widget sends canned responses instead of calling an
 *    LLM API (there's nowhere to safely put a key in front-end code).
 *    Wire `sendMessage` up to your own backend to make it real.
 */

export default function App() {
  const [splashHidden, setSplashHidden] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [homeAnimationKey, setHomeAnimationKey] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [bump, setBump] = useState(false);

  const [selectedFrame, setSelectedFrame] = useState(null);

  const [photos, setPhotos] = useState([]);
  const [uploadDone, setUploadDone] = useState(false);
  const [upForm, setUpForm] = useState({ name: "", phone: "", product: "", occasion: "", notes: "" });

  const [cfForm, setCfForm] = useState({ name: "", phone: "", type: "Custom Order Enquiry", product: "" });

  const [openFaq, setOpenFaq] = useState(null);

  const [chatMessages, setChatMessages] = useState([
    { role: "bot", text: "Hi! I'm Amman AI. Ask me about gift ideas, orders, or delivery." },
  ]);
  const [chatInput, setChatInput] = useState("");

  const [adminOpen, setAdminOpen] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPw, setAdminPw] = useState("");
  const [adminError, setAdminError] = useState(false);
  const [adminMessage, setAdminMessage] = useState("");
  const [orders, setOrders] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setSplashHidden(true), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => onAuthStateChanged(auth, async (user) => {
    if (!user) {
      setAdminUser(null);
      return;
    }
    const token = await user.getIdTokenResult();
    if (token.claims.admin === true) setAdminUser(user);
    else {
      await signOut(auth);
      setAdminUser(null);
    }
  }), []);

  useEffect(() => {
    if (!adminUser) {
      setOrders([]);
      setInquiries([]);
      return undefined;
    }

    return subscribeToAdminData((type, data) => {
      if (type === "orders") setOrders(data);
      else setInquiries(data);
    }, (error) => setAdminMessage(error.message));
  }, [adminUser]);

  useEffect(() => {
    const revealItems = document.querySelectorAll(".as-section, .as-hero");
    if (!revealItems.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [currentPage, homeAnimationKey]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.qty * i.price, 0);

  function scrollToSection(id) {
    setSidebarOpen(false);
    setCurrentPage(id);
    if (id === "home") {
      setHomeAnimationKey((k) => k + 1);
    }
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function goHome() {
    setCurrentPage("home");
    setHomeAnimationKey((k) => k + 1);
    setSidebarOpen(false);
    const el = document.getElementById("section-home");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function renderSectionPage(page) {
    const pageContent = {
      shop: <Shop onAddToCart={addToCart} selectedFrame={selectedFrame} onSelectFrame={setSelectedFrame} onAddFrame={addFrameToCart} />,
      upload: <UploadPage fileInputRef={fileInputRef} photos={photos} onFiles={handleFiles} onRemovePhoto={removePhoto} form={upForm} onFormChange={setUpForm} uploadDone={uploadDone} onConfirm={confirmUploadOrder} onReset={resetUploadForm} />,
      process: <Process />,
      faq: <Faq openIndex={openFaq} onToggle={(i) => setOpenFaq(openFaq === i ? null : i)} />,
      contact: <Contact form={cfForm} onFormChange={setCfForm} onSubmit={submitContactForm} />,
    }[page];

    return (
      <div className="as-page-shell">
        <button className="as-back-home" onClick={goHome}>← Home</button>
        {pageContent}
      </div>
    );
  }

  function addToCart(item) {
    setCart((prev) => {
      const existing = prev.find((x) => x.id === item.id);
      if (existing) {
        return prev.map((x) => (x.id === item.id ? { ...x, qty: x.qty + 1 } : x));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setBump(true);
    setTimeout(() => setBump(false), 400);
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((x) => x.id !== id));
  }

  function addFrameToCart(type) {
    if (!selectedFrame) return;
    const price = type === "frame" ? selectedFrame.frame : selectedFrame.glass;
    if (price == null) return;
    const label = type === "frame" ? "Frame Only" : "Glass + Frame";
    addToCart({
      id: `frame-${selectedFrame.size}-${type}`,
      name: `Photo Frame ${selectedFrame.size} (${label})`,
      price,
    });
  }

  function buildCartWaMessage() {
    const lines = cart.map((i) => `${i.name} × ${i.qty} — ${currency(i.price * i.qty)}`);
    lines.push("", `Total: ${currency(cartTotal)}`);
    return encodeURIComponent(`Hi Amman Studios! I'd like to order:\n\n${lines.join("\n")}`);
  }

  async function checkoutViaWhatsapp() {
    if (cart.length === 0) return;
    try {
      await saveOrder({ items: cart, total: cartTotal, method: "WhatsApp" });
    } catch (error) {
      alert(`We couldn't save your order just now. Please try again. (${error.message})`);
      return;
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildCartWaMessage()}`, "_blank");
  }

  function payWithRazorpay() {
    // Real integration needs a Razorpay key + order-creation endpoint on a
    // server you control. Wire this up there — this is a placeholder so the
    // button is honest about what it does right now.
    alert('Razorpay checkout isn\'t wired to a live account in this demo. Use "Checkout via WhatsApp" or the UPI QR code to complete a real order.');
  }

  function handleFiles(fileList) {
    const files = Array.from(fileList).slice(0, 10 - photos.length);
    const withUrls = files.map((f) => ({ file: f, url: URL.createObjectURL(f) }));
    setPhotos((prev) => [...prev, ...withUrls].slice(0, 10));
  }

  function removePhoto(idx) {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  }

  async function confirmUploadOrder() {
    if (!upForm.name.trim() || !upForm.phone.trim() || !upForm.product) {
      alert("Please enter your name, phone number, and select a product.");
      return;
    }
    try {
      await saveOrder({
        customer: { name: upForm.name.trim(), phone: upForm.phone.trim() },
        items: [{ name: upForm.product, qty: 1 }],
        total: 0,
        method: "Photo order via WhatsApp",
        occasion: upForm.occasion,
        notes: upForm.notes,
      }, photos.map(({ file }) => file));
    } catch (error) {
      alert(`We couldn't save your order and photos. Please try again. (${error.message})`);
      return;
    }
    const lines = [
      `Order details:`,
      `Name: ${upForm.name || "-"}`,
      `Phone: ${upForm.phone || "-"}`,
      `Product: ${upForm.product || "-"}`,
      `Occasion: ${upForm.occasion || "-"}`,
      upForm.notes ? `Notes: ${upForm.notes}` : null,
      "",
      `(${photos.length} photo${photos.length === 1 ? "" : "s"} to follow in this chat)`,
    ].filter(Boolean);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
    setUploadDone(true);
  }

  function resetUploadForm() {
    setUploadDone(false);
    setPhotos([]);
    setUpForm({ name: "", phone: "", product: "", occasion: "", notes: "" });
  }

  async function submitContactForm() {
    if (!cfForm.name.trim() || !cfForm.phone.trim()) {
      alert("Please enter your name and phone number.");
      return;
    }
    try {
      await saveInquiry({ ...cfForm, name: cfForm.name.trim(), phone: cfForm.phone.trim() });
    } catch (error) {
      alert(`We couldn't save your enquiry. Please try again. (${error.message})`);
      return;
    }
    const lines = [
      `Custom order enquiry from the website:`,
      `Name: ${cfForm.name || "-"}`,
      `Phone: ${cfForm.phone || "-"}`,
      `Type: ${cfForm.type}`,
      cfForm.product ? `Product of interest: ${cfForm.product}` : null,
    ].filter(Boolean);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
  }

  async function checkAdminPassword() {
    try {
      const credential = await signInWithEmailAndPassword(auth, adminEmail, adminPw);
      const token = await credential.user.getIdTokenResult();
      if (token.claims.admin !== true) {
        await signOut(auth);
        setAdminMessage("This account is not authorized for admin access.");
        setAdminError(true);
        return;
      }
      setAdminError(false);
      setAdminMessage("");
      setAdminPw("");
    } catch {
      setAdminError(true);
      setAdminMessage("Sign-in failed. Check your Firebase admin email and password.");
    }
  }

  function sendMessage(overrideText) {
    const text = (overrideText ?? chatInput).trim();
    if (!text) return;
    setChatMessages((prev) => [...prev, { role: "user", text }]);
    setChatInput("");
    // Canned reply — replace with a real API call to your backend.
    setTimeout(() => {
      let reply = "Thanks! Someone from the team will follow up shortly — or message us directly on WhatsApp at +91 86820 01729.";
      if (/deliver/i.test(text)) reply = "Delivery is 48 hours within Chennai, and 3–5 days pan-India.";
      else if (/gift|birthday|under/i.test(text)) reply = "A photo mug or a small photo frame both make lovely gifts under ₹1000 — want me to add one to your cart?";
      else if (/photo book|custom/i.test(text)) reply = "Happy to help with a custom photo book! Head to Upload Photos and fill in the details — we'll take it from there.";
      setChatMessages((prev) => [...prev, { role: "bot", text: reply }]);
    }, 500);
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Splash hidden={splashHidden} onSkip={() => setSplashHidden(true)} />

      <Nav
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        cartCount={cartCount}
        bump={bump}
        onCartClick={() => setCartOpen(true)}
        onShopClick={() => scrollToSection("shop")}
        onLogoClick={() => scrollToSection("home")}
        onAdminClick={() => setAdminOpen(true)}
      />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavClick={scrollToSection}
        onCategoryClick={() => scrollToSection("shop")}
      />

      {currentPage === "home" ? (
        <div key={homeAnimationKey} className="as-home-animate">
          <Home onExploreClick={() => scrollToSection("shop")} />

          <Shop
            onAddToCart={addToCart}
            selectedFrame={selectedFrame}
            onSelectFrame={setSelectedFrame}
            onAddFrame={addFrameToCart}
          />

          <UploadPage
            fileInputRef={fileInputRef}
            photos={photos}
            onFiles={handleFiles}
            onRemovePhoto={removePhoto}
            form={upForm}
            onFormChange={setUpForm}
            uploadDone={uploadDone}
            onConfirm={confirmUploadOrder}
            onReset={resetUploadForm}
          />

          <Process />

          <Faq openIndex={openFaq} onToggle={(i) => setOpenFaq(openFaq === i ? null : i)} />

          <Contact form={cfForm} onFormChange={setCfForm} onSubmit={submitContactForm} />
        </div>
      ) : (
        renderSectionPage(currentPage)
      )}

      <Footer onLogoClick={goHome} onAdminClick={() => setAdminOpen(true)} />

      <BottomNav
        cartCount={cartCount}
        onHome={() => scrollToSection("home")}
        onShop={() => scrollToSection("shop")}
        onUpload={() => scrollToSection("upload")}
        onCart={() => setCartOpen(true)}
        onChat={() => setChatOpen(true)}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
        total={cartTotal}
        onCheckoutWhatsapp={checkoutViaWhatsapp}
        onRazorpay={payWithRazorpay}
        qrOpen={qrOpen}
        onToggleQr={() => setQrOpen((v) => !v)}
      />

      <ChatWidget
        open={chatOpen}
        onOpen={() => setChatOpen(true)}
        onClose={() => setChatOpen(false)}
        messages={chatMessages}
        input={chatInput}
        onInputChange={setChatInput}
        onSend={sendMessage}
        onQuickReply={(text) => sendMessage(text)}
      />

      <AdminPanel
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        unlocked={Boolean(adminUser)}
        email={adminEmail}
        onEmailChange={setAdminEmail}
        password={adminPw}
        onPasswordChange={setAdminPw}
        onCheckPassword={checkAdminPassword}
        error={adminError}
        message={adminMessage}
        inquiries={inquiries}
        orders={orders}
        onClearOrders={async () => {
          try {
            await clearAdminData();
            setAdminMessage("");
          } catch (error) {
            setAdminMessage(`Could not clear saved data: ${error.message}`);
          }
        }}
        onSignOut={() => signOut(auth)}
      />
    </div>
  );
}
