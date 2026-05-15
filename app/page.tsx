"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OWNER CONFIG — edit these
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const OWNER_PASSWORD = "adaptable";
const OWNER_VENMO = "amyf_af";
const OWNER_VENMO_AMOUNT = 5;
const OWNER_VENMO_NOTE = "Consequence+Chamber+Tip+💸";
const APP_TITLE = "The Consequence Chamber";
const BASE_URL = "https://consequence-chamber.vercel.app";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SUPABASE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GIFT CATALOG
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const GIFT_CATALOG = [
  { id: "c01", category: "Beauty & Wellness", emoji: "💄", title: "Sephora Gift Card ($50)", affiliate: null },
  { id: "c02", category: "Beauty & Wellness", emoji: "🧖‍♀️", title: "Spa Day Contribution ($75+)", affiliate: null },
  { id: "c03", category: "Beauty & Wellness", emoji: "🕯️", title: "Luxury Candle (Diptyque or equiv.)", affiliate: null },
  { id: "c04", category: "Beauty & Wellness", emoji: "🛁", title: "Fancy Bath Set", affiliate: null },
  { id: "c05", category: "Beauty & Wellness", emoji: "💅", title: "Manicure & Pedicure Voucher", affiliate: null },
  { id: "c06", category: "Food & Drink", emoji: "🍣", title: "Emergency Sushi Delivery", affiliate: null },
  { id: "c07", category: "Food & Drink", emoji: "🍽️", title: "Dinner Reservation (Your Choice)", affiliate: null },
  { id: "c08", category: "Food & Drink", emoji: "🛵", title: "Uber Eats Credit ($40+)", affiliate: null },
  { id: "c09", category: "Food & Drink", emoji: "🍵", title: "Matcha & Pastry Tribute", affiliate: null },
  { id: "c10", category: "Food & Drink", emoji: "🍾", title: "Bottle of Sparkling Vouvray", affiliate: null },
  { id: "c11", category: "Food & Drink", emoji: "🥂", title: "Bottle of Champagne", affiliate: null },
  { id: "c12", category: "Food & Drink", emoji: "🍫", title: "Luxury Chocolate Box", affiliate: null },
  { id: "c13", category: "Experiences", emoji: "🌹", title: "Flowers + Handwritten Apology", affiliate: null },
  { id: "c14", category: "Experiences", emoji: "🎬", title: "Movie Night (You Plan Everything)", affiliate: null },
  { id: "c15", category: "Experiences", emoji: "🎨", title: "Activity of My Choosing", affiliate: null },
  { id: "c16", category: "Experiences", emoji: "🚗", title: "Designated Driver for a Night", affiliate: null },
  { id: "c17", category: "Experiences", emoji: "🧹", title: "Full Apartment Clean (By You)", affiliate: null },
  { id: "c18", category: "Cash & Cards", emoji: "💸", title: "Venmo Tribute ($50)", affiliate: null },
  { id: "c19", category: "Cash & Cards", emoji: "🛍️", title: "Amazon Gift Card ($50)", affiliate: null },
  { id: "c20", category: "Cash & Cards", emoji: "✈️", title: "Travel Fund Contribution ($100)", affiliate: null },
  { id: "c21", category: "Cash & Cards", emoji: "🐾", title: "Tiny find ($50)", affiliate: null },
  { id: "c22", category: "Luxury", emoji: "👜", title: "Designer Item Under $200 (My Pick)", affiliate: null },
  { id: "c23", category: "Luxury", emoji: "💎", title: "Jewelry Contribution Fund", affiliate: null },
  { id: "c24", category: "Luxury", emoji: "🌿", title: "Premium Skincare Product", affiliate: null },
  { id: "c25", category: "Luxury", emoji: "🎁", title: "Mystery Compensation Package", affiliate: null },
];

const DRAMATIC_VERDICTS = [
  "The chamber has spoken.",
  "Consequences have been selected.",
  "Fate did not spare you.",
  "Restitution protocol activated.",
  "The roulette wheel demands tribute.",
  "Your accountability has been assigned.",
  "The universe has decided your fate.",
];

const generateCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STYLES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black: #080808;
    --card: #181818;
    --card2: #1e1e1e;
    --border: rgba(255,255,255,0.07);
    --border-gold: rgba(212,168,67,0.35);
    --gold: #d4a843;
    --gold-light: #e8c56a;
    --gold-dim: rgba(212,168,67,0.15);
    --red: #b83232;
    --red-glow: rgba(184,50,50,0.2);
    --text: #f0ebe0;
    --text-2: rgba(240,235,224,0.55);
    --text-3: rgba(240,235,224,0.28);
    --serif: 'Cormorant Garamond', Georgia, serif;
    --mono: 'DM Mono', monospace;
    --radius: 14px;
    --radius-sm: 8px;
  }

  html, body { min-height: 100vh; background: var(--black); }
  body { font-family: var(--mono); color: var(--text); -webkit-font-smoothing: antialiased; }

  .app { min-height: 100vh; display: flex; align-items: flex-start; justify-content: center; padding: 2rem 1rem 3rem; }
  .wrap { width: 100%; max-width: 440px; }

  .topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.75rem; }
  .logo { font-family: var(--serif); font-size: 1rem; font-weight: 600; color: var(--gold); }
  .badge { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-3); border: 1px solid var(--border); padding: 3px 10px; border-radius: 20px; }

  .card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.75rem; margin-bottom: 1rem; }
  .card-accent { border-color: var(--border-gold); background: linear-gradient(135deg, var(--card) 0%, #1a1710 100%); }

  .eyebrow { font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.5rem; }
  .heading { font-family: var(--serif); font-size: 2.4rem; font-weight: 600; line-height: 1.05; margin-bottom: 0.4rem; }
  .heading-sm { font-family: var(--serif); font-size: 1.5rem; font-weight: 600; line-height: 1.1; margin-bottom: 0.4rem; }
  .sub { font-size: 12px; color: var(--text-2); line-height: 1.7; }
  .label { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-3); margin-bottom: 0.4rem; display: block; }

  .input { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.75rem 1rem; color: var(--text); font-family: var(--mono); font-size: 13px; outline: none; transition: border-color 0.2s; }
  .input:focus { border-color: var(--gold); }
  .input::placeholder { color: var(--text-3); }

  .select { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.75rem 1rem; color: var(--text); font-family: var(--mono); font-size: 12px; outline: none; cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 2rem; }
  .select:focus { border-color: var(--gold); }
  .select option { background: #1e1e1e; color: var(--text); }

  .btn { width: 100%; padding: 0.85rem 1rem; border: none; border-radius: var(--radius-sm); font-family: var(--mono); font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer; transition: all 0.18s; font-weight: 500; }
  .btn-gold { background: var(--gold); color: #000; }
  .btn-gold:hover:not(:disabled) { background: var(--gold-light); transform: translateY(-1px); }
  .btn-red { background: var(--red); color: #fff; box-shadow: 0 0 20px var(--red-glow); }
  .btn-red:hover:not(:disabled) { filter: brightness(1.12); transform: translateY(-1px); }
  .btn-ghost { background: rgba(255,255,255,0.04); color: var(--text-2); border: 1px solid var(--border); }
  .btn-ghost:hover { background: rgba(255,255,255,0.08); color: var(--text); }
  .btn-venmo { background: #3D95CE; color: #fff; text-decoration: none; display: block; text-align: center; }
  .btn-venmo:hover { filter: brightness(1.1); transform: translateY(-1px); }
  .btn:disabled { opacity: 0.3; cursor: not-allowed; transform: none !important; }
  .btn-sm { padding: 0.55rem 0.85rem; font-size: 11px; width: auto; }

  .gap { display: flex; flex-direction: column; gap: 0.65rem; }
  .gap-sm { display: flex; flex-direction: column; gap: 0.4rem; }
  .row { display: flex; gap: 0.65rem; align-items: center; }
  .mt1 { margin-top: 0.75rem; }
  .mt2 { margin-top: 1.25rem; }
  .mb1 { margin-bottom: 0.75rem; }
  .center { text-align: center; }
  .divider { height: 1px; background: var(--border); margin: 1.25rem 0; }

  .gift-slot { background: var(--card2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.85rem 1rem; }
  .slot-num { font-size: 10px; letter-spacing: 0.2em; color: var(--gold); text-transform: uppercase; margin-bottom: 0.5rem; }
  .slot-preview { font-size: 13px; color: var(--text); display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem; }

  .code-pill { display: inline-flex; align-items: center; gap: 0.5rem; background: var(--gold-dim); border: 1px solid var(--border-gold); border-radius: 8px; padding: 0.6rem 1rem; font-size: 1.1rem; letter-spacing: 0.2em; color: var(--gold); font-weight: 500; }

  .chamber-outer { width: 200px; height: 200px; border-radius: 50%; border: 2px solid var(--border-gold); background: radial-gradient(circle at 38% 32%, #1c1a14, #0f0f0f); display: flex; align-items: center; justify-content: center; position: relative; margin: 0 auto 1rem; box-shadow: 0 0 50px rgba(212,168,67,0.07), inset 0 0 40px rgba(0,0,0,0.6); }
  .chamber-ring { position: absolute; inset: 10px; border-radius: 50%; border: 1px dashed rgba(212,168,67,0.18); }
  .chamber-ring.spin { animation: cspin 0.35s linear infinite; }
  @keyframes cspin { to { transform: rotate(360deg); } }
  .chamber-core { width: 50px; height: 50px; border-radius: 50%; background: var(--red); border: 3px solid rgba(255,255,255,0.12); box-shadow: 0 0 24px var(--red-glow); position: relative; z-index: 2; }
  .chamber-label { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2.2rem; z-index: 3; }
  .chamber-count { font-family: var(--serif); font-size: 5rem; font-weight: 600; color: var(--gold); line-height: 1; }
  .chamber-idle { font-size: 10px; letter-spacing: 0.18em; color: var(--text-3); text-transform: uppercase; line-height: 1.6; }
  .chamber-emoji { font-size: 2rem; margin-bottom: 0.3rem; }
  .chamber-result-title { font-family: var(--serif); font-size: 0.95rem; font-weight: 600; line-height: 1.3; color: var(--text); }

  .dots { display: flex; gap: 0.5rem; justify-content: center; }
  .dot { width: 8px; height: 8px; border-radius: 50%; border: 1px solid var(--border-gold); transition: background 0.3s; }
  .dot.on { background: var(--gold); border-color: var(--gold); }

  .verdict { border: 1px solid var(--border-gold); background: rgba(212,168,67,0.04); border-radius: var(--radius); padding: 1.25rem; text-align: center; margin-bottom: 1rem; }
  .verdict-msg { font-family: var(--serif); font-style: italic; font-size: 1rem; color: var(--text-2); margin-bottom: 0.4rem; }
  .verdict-gift { font-family: var(--serif); font-size: 1.4rem; font-weight: 600; margin-bottom: 0.25rem; }
  .verdict-link { display: inline-flex; align-items: center; gap: 0.35rem; background: var(--gold); color: #000; padding: 0.5rem 1.1rem; border-radius: 6px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none; font-weight: 500; transition: all 0.18s; }
  .verdict-link:hover { background: var(--gold-light); }

  .code-row { display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 0; border-bottom: 1px solid var(--border); gap: 1rem; }
  .code-row:last-child { border-bottom: none; }
  .code-mono { font-size: 13px; letter-spacing: 0.15em; color: var(--gold); }
  .code-status { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-3); }
  .code-status.used { color: #c0392b; }

  .tip-box { border: 1px solid var(--border-gold); background: rgba(212,168,67,0.05); border-radius: var(--radius); padding: 1.25rem 1.5rem; text-align: center; }
  .foot { font-size: 10px; color: var(--text-3); text-align: center; margin-top: 1.5rem; letter-spacing: 0.08em; line-height: 1.8; }

  @keyframes shake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-7px); } 40% { transform: translateX(7px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } }
  .shake { animation: shake 0.38s ease; }
  @keyframes fadein { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  .fadein { animation: fadein 0.3s ease forwards; }
  @keyframes pulsein { 0% { opacity: 0; transform: scale(0.93); } 60% { transform: scale(1.02); } 100% { opacity: 1; transform: scale(1); } }
  .pulsein { animation: pulsein 0.32s ease forwards; }

  .loading { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; gap: 1rem; }
  .loading-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gold); animation: pulse 1.2s ease-in-out infinite; }
  .loading-dot:nth-child(2) { animation-delay: 0.2s; }
  .loading-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes pulse { 0%, 100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GIFT SLOT COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function GiftSlot({ index, value, onChange, usedIds }) {
  const [mode, setMode] = useState(value?.custom ? "custom" : "catalog");
  const [customTitle, setCustomTitle] = useState(value?.custom ? value.title : "");
  const [customLink, setCustomLink] = useState(value?.custom ? (value.affiliate || "") : "");
  const categories = [...new Set(GIFT_CATALOG.map(g => g.category))];

  const handleSelect = (e) => {
    const id = e.target.value;
    if (id === "other") { setMode("custom"); onChange(null); return; }
    if (!id) { onChange(null); return; }
    const gift = GIFT_CATALOG.find(g => g.id === id);
    onChange(gift ? { ...gift } : null);
  };

  const handleCustomSave = () => {
    if (!customTitle.trim()) return;
    onChange({ id: "custom_" + index, title: customTitle.trim(), emoji: "🎁", affiliate: customLink.trim() || null, custom: true });
  };

  const isUsed = (id) => usedIds.includes(id) && value?.id !== id;

  return (
    <div className="gift-slot">
      <p className="slot-num">Gift {index + 1}</p>
      {mode === "catalog" ? (
        <>
          <select className="select" value={value?.id || ""} onChange={handleSelect}>
            <option value="">— Select a gift —</option>
            {categories.map(cat => (
              <optgroup key={cat} label={cat}>
                {GIFT_CATALOG.filter(g => g.category === cat).map(g => (
                  <option key={g.id} value={g.id} disabled={isUsed(g.id)}>
                    {g.emoji} {g.title}{isUsed(g.id) ? " (already chosen)" : ""}
                  </option>
                ))}
              </optgroup>
            ))}
            <optgroup label="─────────────">
              <option value="other">✏️ Other (write your own)</option>
            </optgroup>
          </select>
          {value && <p className="slot-preview">{value.emoji} {value.title}</p>}
        </>
      ) : (
        <div className="gap-sm">
          <input className="input" placeholder="Gift title" value={customTitle} onChange={e => setCustomTitle(e.target.value)} />
          <input className="input" placeholder="Link (optional)" value={customLink} onChange={e => setCustomLink(e.target.value)} />
          <div className="row">
            <button className="btn btn-gold btn-sm" onClick={handleCustomSave}>Save</button>
            <button className="btn btn-ghost btn-sm" onClick={() => { setMode("catalog"); onChange(null); }}>← Back</button>
          </div>
          {value?.custom && <p className="slot-preview">🎁 {value.title}</p>}
        </div>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN APP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function App() {
  const [screen, setScreen] = useState("loading");
  const [pwInput, setPwInput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [entryMode, setEntryMode] = useState("code");
  const [generatedCodes, setGeneratedCodes] = useState([]);
  const [senderName, setSenderName] = useState("");
  const [senderVenmo, setSenderVenmo] = useState("");
  const [gifts, setGifts] = useState(Array(10).fill(null));
  const [activeCode, setActiveCode] = useState("");
  const [receiverGifts, setReceiverGifts] = useState([]);
  const [receiverVenmo, setReceiverVenmo] = useState("");
  const [receiverSenderName, setReceiverSenderName] = useState("");
  const [spinsLeft, setSpinsLeft] = useState(3);
  const [isSpinning, setIsSpinning] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [selectedGift, setSelectedGift] = useState(null);
  const [verdict, setVerdict] = useState("");
  const [resultKey, setResultKey] = useState(0);
  const [rouletteLink, setRouletteLink] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [saveError, setSaveError] = useState("");

  // ── Check URL for receiver code on load ──────────────────────
  useEffect(() => {
    const load = async () => {
      const params = new URLSearchParams(window.location.search);
      const r = params.get("r");
      if (r) {
        const { data, error } = await supabase
          .from("roulettes")
          .select("*")
          .eq("code", r)
          .single();
        if (data && !error) {
          setReceiverGifts(data.gifts);
          setReceiverVenmo(data.sender_venmo);
          setReceiverSenderName(data.sender_name);
          setScreen("receiver");
        } else {
          setScreen("entry");
        }
      } else {
        setScreen("entry");
      }
    };
    load();
  }, []);

  const tryOwner = () => {
    if (pwInput.trim().toLowerCase() === OWNER_PASSWORD.toLowerCase()) {
      setScreen("owner");
    } else {
      setPwError(true);
      setTimeout(() => setPwError(false), 420);
    }
  };

  const tryCode = async () => {
    const c = codeInput.trim().toUpperCase();
    const { data, error } = await supabase
      .from("roulettes")
      .select("code")
      .eq("code", c)
      .single();
    if (!error && data) {
      setCodeError(true);
      setTimeout(() => setCodeError(false), 420);
      return;
    }
    setActiveCode(c);
    setScreen("sender");
  };

  const makeCode = () => {
    const c = generateCode();
    setGeneratedCodes(prev => [...prev, c]);
  };

  const filledGifts = gifts.filter(Boolean);
  const usedIds = gifts.filter(Boolean).map(g => g.id);

  const handleGiftChange = (i, val) => {
    setGifts(prev => { const n = [...prev]; n[i] = val; return n; });
  };

  const goPreview = () => {
    if (filledGifts.length < 10) return;
    setScreen("preview");
  };

  const generateLink = async () => {
    setSaveError("");
    const { error } = await supabase.from("roulettes").insert({
      code: activeCode,
      sender_name: senderName,
      sender_venmo: senderVenmo,
      gifts: filledGifts,
    });
    if (error) {
      setSaveError("Something went wrong saving your roulette. Please try again.");
      return;
    }
    const link = `${BASE_URL}?r=${activeCode}`;
    setRouletteLink(link);
    setScreen("link-ready");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(rouletteLink).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  const spin = () => {
    if (spinsLeft <= 0 || isSpinning) return;
    setIsSpinning(true);
    setSelectedGift(null);
    setVerdict("");
    let t = 3;
    setCountdown(t);
    const iv = setInterval(() => {
      t -= 1;
      setCountdown(t > 0 ? t : null);
      if (t <= 0) {
        clearInterval(iv);
        const g = receiverGifts[Math.floor(Math.random() * receiverGifts.length)];
        const v = DRAMATIC_VERDICTS[Math.floor(Math.random() * DRAMATIC_VERDICTS.length)];
        setSelectedGift(g);
        setVerdict(v);
        setSpinsLeft(p => p - 1);
        setIsSpinning(false);
        setResultKey(k => k + 1);
      }
    }, 1000);
  };

  const ownerVenmoLink = `https://venmo.com/${OWNER_VENMO}?txn=pay&amount=${OWNER_VENMO_AMOUNT}&note=${OWNER_VENMO_NOTE}`;
  const senderVenmoLink = receiverVenmo ? `https://venmo.com/${receiverVenmo}?txn=pay&amount=50&note=Accountability+Tribute+💸` : null;

  // ── LOADING ───────────────────────────────────────────────────
  if (screen === "loading") return (
    <>
      <style>{css}</style>
      <div className="loading">
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <div className="loading-dot" />
          <div className="loading-dot" />
          <div className="loading-dot" />
        </div>
        <p style={{ fontSize: "11px", color: "var(--text-3)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Loading chamber</p>
      </div>
    </>
  );

  // ── ENTRY ─────────────────────────────────────────────────────
  if (screen === "entry") return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="wrap">
          <div className="topbar">
            <span className="logo">{APP_TITLE}</span>
            <span className="badge">Restricted</span>
          </div>
          <div className={`card card-accent ${pwError || codeError ? "shake" : ""}`}>
            <div className="center mb1">
              <p className="eyebrow">Access Portal</p>
              <h1 className="heading" style={{ fontSize: "2rem" }}>{APP_TITLE}</h1>
              <p className="sub">Accountability delivered with style.</p>
            </div>
            <div className="divider" />
            <div className="row mb1">
              <button className={`btn ${entryMode === "code" ? "btn-gold" : "btn-ghost"}`} onClick={() => setEntryMode("code")}>Sender Access</button>
              <button className={`btn ${entryMode === "owner" ? "btn-gold" : "btn-ghost"}`} onClick={() => setEntryMode("owner")}>Owner</button>
            </div>
            {entryMode === "code" ? (
              <div className="gap-sm">
                <span className="label">Enter your access code</span>
                <input className="input" placeholder="e.g. A3X9KQ" value={codeInput} onChange={e => setCodeInput(e.target.value.toUpperCase())} onKeyDown={e => e.key === "Enter" && tryCode()} style={{ letterSpacing: "0.22em", textAlign: "center", fontSize: "1.1rem" }} />
                <button className="btn btn-gold mt1" onClick={tryCode}>Enter the Chamber</button>
                <p className="sub center" style={{ marginTop: "0.5rem" }}>
                  Don't have a code? <a href={ownerVenmoLink} target="_blank" rel="noreferrer" style={{ color: "var(--gold)" }}>Purchase access →</a>
                </p>
              </div>
            ) : (
              <div className="gap-sm">
                <span className="label">Owner password</span>
                <input type="password" className="input" placeholder="Password" value={pwInput} onChange={e => setPwInput(e.target.value)} onKeyDown={e => e.key === "Enter" && tryOwner()} style={{ textAlign: "center" }} />
                <button className="btn btn-gold mt1" onClick={tryOwner}>Access Admin</button>
              </div>
            )}
          </div>
          <p className="foot">Built for dramatic accountability & luxury reparations.</p>
        </div>
      </div>
    </>
  );

  // ── OWNER ─────────────────────────────────────────────────────
  if (screen === "owner") return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="wrap">
          <div className="topbar">
            <span className="logo">{APP_TITLE}</span>
            <span className="badge" style={{ color: "var(--gold)", borderColor: "var(--border-gold)" }}>Admin</span>
          </div>
          <div className="card card-accent mb1">
            <p className="eyebrow">Owner Dashboard</p>
            <h2 className="heading-sm">Access Code Generator</h2>
            <p className="sub">Generate a code, sell it, and the buyer gets one-time sender access.</p>
            <button className="btn btn-gold mt2" onClick={makeCode}>Generate New Code</button>
          </div>
          {generatedCodes.length > 0 && (
            <div className="card fadein">
              <p className="eyebrow">Generated Codes</p>
              {generatedCodes.map(c => (
                <div className="code-row" key={c}>
                  <span className="code-mono">{c}</span>
                  <button className="btn btn-ghost btn-sm" onClick={() => navigator.clipboard.writeText(c)}>Copy</button>
                </div>
              ))}
            </div>
          )}
          <div className="card">
            <p className="eyebrow">Your Venmo</p>
            <p className="sub">Buyers pay you before you share the code:</p>
            <div className="center mt1"><span className="code-pill">@{OWNER_VENMO}</span></div>
            <a href={ownerVenmoLink} className="btn btn-venmo mt2" target="_blank" rel="noreferrer">Open Venmo Payment Link</a>
          </div>
          <button className="btn btn-ghost" onClick={() => setScreen("entry")}>← Sign Out</button>
          <p className="foot">You control all distribution. Every code you generate is a sale.</p>
        </div>
      </div>
    </>
  );

  // ── SENDER ────────────────────────────────────────────────────
  if (screen === "sender") return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="wrap">
          <div className="topbar">
            <span className="logo">{APP_TITLE}</span>
            <span className="badge">Sender Setup</span>
          </div>
          <div className="card card-accent">
            <p className="eyebrow">Step 1 — Your Details</p>
            <div className="gap-sm">
              <label className="label">Your name (shown to receiver)</label>
              <input className="input" placeholder="e.g. The Aggrieved Party" value={senderName} onChange={e => setSenderName(e.target.value)} />
              <label className="label mt1">Your Venmo handle (receiver's fallback payment)</label>
              <input className="input" placeholder="@your-venmo" value={senderVenmo} onChange={e => setSenderVenmo(e.target.value)} />
            </div>
          </div>
          <div className="card">
            <p className="eyebrow">Step 2 — Build Your Roulette</p>
            <p className="sub mb1">Choose 10 unique gifts. Use "Other" at the bottom of any dropdown to write your own.</p>
            <div className="gap">
              {Array.from({ length: 10 }).map((_, i) => (
                <GiftSlot key={i} index={i} value={gifts[i]} onChange={val => handleGiftChange(i, val)} usedIds={usedIds} />
              ))}
            </div>
          </div>
          <div className="gap">
            <button className="btn btn-gold" onClick={goPreview} disabled={filledGifts.length < 10 || !senderName.trim()}>
              Preview My Roulette →
            </button>
            <p className="sub center">{filledGifts.length}/10 gifts selected{!senderName.trim() ? " · Add your name above" : ""}</p>
          </div>
          <p className="foot">All 10 slots must be filled to generate a link.</p>
        </div>
      </div>
    </>
  );

  // ── PREVIEW ───────────────────────────────────────────────────
  if (screen === "preview") return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="wrap fadein">
          <div className="topbar">
            <span className="logo">{APP_TITLE}</span>
            <span className="badge">Preview</span>
          </div>
          <div className="card card-accent center">
            <p className="eyebrow">Your Roulette Preview</p>
            <h2 className="heading-sm">This is what he'll see</h2>
            <p className="sub">Sent by: <strong style={{ color: "var(--gold)" }}>{senderName}</strong></p>
          </div>
          <div className="card">
            <p className="eyebrow">Gift Pool</p>
            {filledGifts.map((g, i) => (
              <div className="code-row" key={i}>
                <span style={{ fontSize: "13px" }}>{g.emoji} {g.title}</span>
                {g.affiliate && <span style={{ fontSize: "10px", color: "var(--gold)" }}>LINKED</span>}
              </div>
            ))}
          </div>
          <div className="tip-box fadein">
            <p className="eyebrow">Support the Creator</p>
            <p className="sub mb1">Enjoying the chamber? Send a small tip to keep the operation running.</p>
            <p style={{ fontFamily: "var(--serif)", fontSize: "1.75rem", color: "var(--gold)", marginBottom: "0.25rem" }}>${OWNER_VENMO_AMOUNT}</p>
            <p className="label" style={{ marginBottom: "0.85rem" }}>suggested tip</p>
            <a href={ownerVenmoLink} target="_blank" rel="noreferrer" style={{ display: "inline-block", background: "#3D95CE", color: "#fff", padding: "0.6rem 1.5rem", borderRadius: "8px", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>Tip via Venmo</a>
          </div>
          {saveError && <p style={{ color: "#c0392b", fontSize: "12px", textAlign: "center", marginTop: "0.5rem" }}>{saveError}</p>}
          <div className="gap mt2">
            <button className="btn btn-red" onClick={generateLink}>Generate My Link →</button>
            <button className="btn btn-ghost" onClick={() => setScreen("sender")}>← Edit Gifts</button>
          </div>
          <p className="foot">Tip is optional. Your link generates either way.</p>
        </div>
      </div>
    </>
  );

  // ── LINK READY ────────────────────────────────────────────────
  if (screen === "link-ready") return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="wrap fadein">
          <div className="topbar">
            <span className="logo">{APP_TITLE}</span>
            <span className="badge">Link Ready</span>
          </div>
          <div className="card card-accent center">
            <p className="eyebrow">Your Link is Live</p>
            <h2 className="heading-sm">Send it. Watch it play out.</h2>
            <p className="sub">Copy the link below and text it to whoever has earned a consequence.</p>
            <div style={{ margin: "1.25rem 0", padding: "0.85rem 1rem", background: "rgba(0,0,0,0.3)", borderRadius: "8px", border: "1px solid var(--border-gold)", wordBreak: "break-all", fontSize: "12px", color: "var(--gold)", letterSpacing: "0.04em" }}>
              {rouletteLink}
            </div>
            <button className="btn btn-gold" onClick={copyLink}>{linkCopied ? "✓ Copied!" : "Copy Link"}</button>
          </div>
          <div className="card center">
            <p className="eyebrow">What happens next</p>
            <p className="sub">They open the link → straight into the chamber → 3 spins → consequence. If they refuse, they hit your Venmo instead.</p>
          </div>
          <p className="foot">Share responsibly. Or don't. The chamber has no mercy.</p>
        </div>
      </div>
    </>
  );

  // ── RECEIVER ──────────────────────────────────────────────────
  if (screen === "receiver") return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="wrap">
          <div className="topbar">
            <span className="logo">{APP_TITLE}</span>
            <span className="badge">Your Fate Awaits</span>
          </div>
          {receiverSenderName && (
            <div className="card center mb1 fadein">
              <p className="sub" style={{ fontSize: "11px" }}>A consequence has been prepared for you by</p>
              <p style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", color: "var(--gold)", marginTop: "0.25rem" }}>{receiverSenderName}</p>
            </div>
          )}
          <div className="card card-accent">
            <div className="center" style={{ marginBottom: "1.25rem" }}>
              <p className="eyebrow">Consequence Protocol</p>
              <h1 className="heading" style={{ marginBottom: "0.2rem" }}>{APP_TITLE}</h1>
              <p className="sub" style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>Three chances. One destiny.</p>
            </div>
            <div className="chamber-outer">
              <div className={`chamber-ring ${isSpinning ? "spin" : ""}`} />
              <div className="chamber-core" />
              <div className="chamber-label">
                {countdown !== null ? (
                  <span className="chamber-count">{countdown}</span>
                ) : selectedGift ? (
                  <>
                    <span className="chamber-emoji">{selectedGift.emoji}</span>
                    <span className="chamber-result-title">{selectedGift.title}</span>
                  </>
                ) : (
                  <span className="chamber-idle">Awaiting{"\n"}accountability</span>
                )}
              </div>
            </div>
            <div className="dots" style={{ marginBottom: "1.25rem" }}>
              {[0,1,2].map(i => <div key={i} className={`dot ${i < spinsLeft ? "on" : ""}`} />)}
            </div>
            {selectedGift && verdict && !isSpinning && (
              <div className="verdict pulsein" key={resultKey}>
                <p className="label">Final Verdict</p>
                <p className="verdict-msg">{verdict}</p>
                <p className="verdict-gift">{selectedGift.emoji} {selectedGift.title}</p>
                {selectedGift.affiliate && (
                  <a href={selectedGift.affiliate} target="_blank" rel="noreferrer" className="verdict-link">View / Shop ↗</a>
                )}
              </div>
            )}
            <div className="gap">
              <button className="btn btn-red" onClick={spin} disabled={spinsLeft <= 0 || isSpinning}>
                {isSpinning ? "Calculating fate..." : spinsLeft <= 0 ? "No Spins Remaining" : "Pull the Trigger"}
              </button>
              {(spinsLeft <= 0 || selectedGift) && !isSpinning && senderVenmoLink && (
                <a href={senderVenmoLink} target="_blank" rel="noreferrer" style={{ display: "block", textAlign: "center", textDecoration: "none", padding: "0.85rem", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", background: "rgba(255,255,255,0.04)", color: "rgba(240,235,224,0.55)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px" }}>
                  Refuse All Outcomes → Pay Instead
                </a>
              )}
            </div>
          </div>
          <p className="foot">Consequences are non-negotiable. Refusal results in monetary tribute.<br />Powered by {APP_TITLE}.</p>
        </div>
      </div>
    </>
  );

  return null;
}
